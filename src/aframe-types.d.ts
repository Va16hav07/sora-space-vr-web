// A-Frame custom elements declaration
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': React.DetailedHTMLProps<any, any>;
      'a-entity': React.DetailedHTMLProps<any, any>;
      'a-camera': React.DetailedHTMLProps<any, any>;
      'a-box': React.DetailedHTMLProps<any, any>;
      'a-sphere': React.DetailedHTMLProps<any, any>;
      'a-cylinder': React.DetailedHTMLProps<any, any>;
      'a-plane': React.DetailedHTMLProps<any, any>;
      'a-sky': React.DetailedHTMLProps<any, any>;
      'a-image': React.DetailedHTMLProps<any, any>;
      'a-text': React.DetailedHTMLProps<any, any>;
    }
  }
}
export {};
