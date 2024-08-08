import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Editor
            apiKey="wt8zt1pa9e1a9fpxk9ggh9xh6hssi77vphfvsjsu7ptfhpx9" // Replace with your TinyMCE API key
            initialValue={defaultValue}
            value={value} // Bind editor value to form value
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              readonly: false, // Ensure editor is not read-only
            }}
            onEditorChange={(newValue) => onChange(newValue)} // Update form value on editor change
            onBlur={onBlur} // Mark field as touched on blur
            ref={ref} // Set ref for form control
          />
        )}
      />
    </div>
  );
}
