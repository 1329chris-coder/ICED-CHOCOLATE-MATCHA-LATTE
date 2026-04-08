'use client';

import React from 'react';

export default function Watermark() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* 3 horizontal strips with red color and higher visibility */}
      <div 
        className="absolute w-full whitespace-nowrap select-none"
        style={{
          top: '20vh',
          opacity: 0.15, // Significantly increased visibility
          transform: 'rotate(-1deg)',
        }}
      >
        <div className="flex justify-center">
          <div className="tracking-widest font-light" style={{ 
            fontSize: '30px',
            color: '#FF0000' // Changed to red
          }}>
            {Array(25).fill("chriswebdeveloper • ").join(" ")}
          </div>
        </div>
      </div>
      
      <div 
        className="absolute w-full whitespace-nowrap select-none"
        style={{
          top: '50vh',
          opacity: 0.2, // Significantly increased visibility
          transform: 'rotate(-1deg)',
        }}
      >
        <div className="flex justify-center">
          <div className="tracking-widest font-light" style={{ 
            fontSize: '30px',
            color: '#FF0000' // Changed to red
          }}>
            {Array(25).fill("chriswebdeveloper • ").join(" ")}
          </div>
        </div>
      </div>
      
      <div 
        className="absolute w-full whitespace-nowrap select-none"
        style={{
          top: '80vh',
          opacity: 0.2, // Significantly increased visibility
          transform: 'rotate(-1deg)',
        }}
      >
        <div className="flex justify-center">
          <div className="tracking-widest font-light" style={{ 
            fontSize: '30px',
            color: '#FF0000' // Changed to red
          }}>
            {Array(25).fill("chriswebdeveloper • ").join(" ")}
          </div>
        </div>
      </div>
    </div>
  );
}
