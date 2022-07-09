import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import { Markdown } from '../../components/Markdown';
import { GetTextFromUrlService } from '../../services/GetTextFromUrlService';

const GITHUB_DOCS_REPO = 'dtemplate/documentation';
const GITHUB_DOCS_REPO_MAIN_BRANCH = 'master';
const GITHUB_DOCS_REPO_TREE_PATH = 'docs';

export default function DocsPage() {
  const [markdownDocs, setMarkdownDocs] = React.useState<string>('');

  useEffect(() => {
    const load = async () => {
      const indexDocsUrl = `https://raw.githubusercontent.com/${GITHUB_DOCS_REPO}/${GITHUB_DOCS_REPO_MAIN_BRANCH}/${GITHUB_DOCS_REPO_TREE_PATH}/index.md`;
      const getTextFromUrlService = new GetTextFromUrlService();
      const indexDocsContent = await getTextFromUrlService.execute(
        indexDocsUrl,
      );
      setMarkdownDocs(indexDocsContent);
    };
    load();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>All documentation | Dev Template</title>
      </Head>
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Markdown>{markdownDocs}</Markdown>
      </Box>
    </React.Fragment>
  );
}
