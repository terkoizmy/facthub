"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { useState, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useMutation, useQuery  } from 'convex/react';
import { api } from '@/../../convex/_generated/api';
import toast from "react-hot-toast";
import { redirect } from 'next/navigation';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const mdParser = new MarkdownIt(/* Markdown-it options */);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.object({
    text: z.string().min(1, "Content is required"),
    html: z.string(),
  }),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export default function CreateNews({ userId }: any) {
  const [editorContent, setEditorContent] = useState({ text: '', html: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: { text: "", html: "" },
    },
  });

  const handleEditorChange = useCallback(({ html, text }: { html: string, text: string }) => {
    setEditorContent({ html, text });
    form.setValue("content", { text, html });
  }, [form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const generateUploadUrl = useMutation(api.uploadFile.generateUploadUrl);
  const saveFile = useMutation(api.uploadFile.saveFile);
  const createNewsArticle = useMutation(api.createNewsArticle.default);
  const getUser = useMutation(api.getUser.default);

  async function getFileUrl(storageId: string) {
    return `${process.env.CONVEX_SITE_URL}/getImage?storageId=${storageId}`;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Saving content:', values);
    
    try {
      const toastId = toast.loading('Loading...');
      // Upload image
      const file = values.image[0];
      
      toast.loading('Uploading file...', {
        id: toastId,
      });
  
      // Get upload URL
      const uploadUrl = await generateUploadUrl();
  
      // Upload file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
  
      if (!result.ok) {
        throw new Error(`Upload failed with status ${result.status}`);
      }     

      const { storageId } = await result.json();
      console.log("Storage Id:", storageId);
  
      // Save file reference
      await saveFile({ storageId });
  
      // Get file URL
      const fileUrl = await getFileUrl(storageId);
      console.log("fileUrl:", fileUrl);
      
      // Create news article
      toast.loading('Creating News', {
        id: toastId,
      });

      console.log("Upload berhasil")

      const convexUser = await getUser({ clerkId: userId });
      if (!convexUser) {
        throw new Error("User not found in Convex database");
      }
      
      await createNewsArticle({
        title: values.title,
        content: values.content.text,
        htmlContent: values.content.html,
        thumbnailUrl: fileUrl,
        authorId: convexUser._id,
      });
  
      console.log('News article posted successfully!');
      toast.success('Successfully Created News Article', {
        id: toastId,
      });
      
      // Reset form or navigate to another page
    } catch (err) {
      console.error('Error posting news:', err);
      toast.remove();
      toast.error('Error creating news article')
    }
  }

  return (
    <div className="mx-5 my-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Thumbnail Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files);
                    }}
                    // ref={fileInputRef}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="max-w-xs h-auto" />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Post</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Japan Lifts Megathrust Earth...'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={handleEditorChange}
                    // value={editorContent}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Post</Button>
        </form>
      </Form>
    </div>
  );
}