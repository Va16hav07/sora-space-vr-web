import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-sky': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-sphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-cylinder': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-plane': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-image': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'a-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
