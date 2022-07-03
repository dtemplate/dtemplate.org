import React from 'react';

// Markdown Editor dependencies:
import { Viewer } from '@bytemd/react';
import gfmPlugin from '@bytemd/plugin-gfm';
import highlightSsrPlugin from '@bytemd/plugin-highlight-ssr';
import mermaidPlugin from '@bytemd/plugin-mermaid';
import breaksPlugin from '@bytemd/plugin-breaks';
import gemojiPlugin from '@bytemd/plugin-gemoji';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown-light.css';
import { Box } from '@mui/material';

interface IProps {
  children: string;
}

export function Markdown({ children }: IProps) {
  const bytemdPluginList = [
    gfmPlugin(),
    highlightSsrPlugin(),
    mermaidPlugin(),
    breaksPlugin(),
    gemojiPlugin(),
  ];

  return (
    <Box>
      <Viewer value={children} plugins={bytemdPluginList} />
    </Box>
  );
}
