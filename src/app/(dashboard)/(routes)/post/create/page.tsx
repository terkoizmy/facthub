"use client";
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";


const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

// Initialize markdown parser outside the component
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function CreatePost() {
  const [content, setContent] = useState({ text: '', html: '' });

  // Use useCallback to memoize the handleEditorChange function
  const handleEditorChange = useCallback(({ html, text }: any) => {
    setContent({ html, text });
  }, []);

  function save() {
    console.log('Saving content:', content);
    // Implement your save logic here
  }

  return (
    <div>
      <div>
        <Label htmlFor="picture">Thumbnail</Label>
        <Input id="picture" type="file" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title Post</Label>
        <Input type="email" id="email" placeholder="e.g. 'Japan Lifts Megathrust Earth...' " />
      </div>
      <MdEditor 
        style={{ height: '500px' }} 
        renderHTML={text => mdParser.render(text)} 
        onChange={handleEditorChange} 
      />
      <div className='flex justify-end'>
        <Button onClick={save}>
          Post
        </Button>
      </div>
    </div>
  );
}