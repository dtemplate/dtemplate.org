import React from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';
import { Markdown } from '../../components/Markdown';
import { GithubGetRepoTree } from '../../services/github/GithubGetRepoTree';
import { autoConvertJSONToPaths } from '../../utils/autoConvertJSONToPaths';
import { GetTextFromUrlService } from '../../services/GetTextFromUrlService';

const GITHUB_DOCS_REPO = 'dtemplate/documentation';
const GITHUB_DOCS_REPO_MAIN_BRANCH = 'master';
const GITHUB_DOCS_REPO_TREE_PATH = 'docs';
const PATHS_ADD_BY_STATIC_WAY = ['docs'];

interface IProps {
  markdownDocs: string;
  docsName: string;
}

export default function DocsFile({ markdownDocs, docsName }: IProps) {
  return (
    <React.Fragment>
      <Head>
        <title>{docsName} documentation | Dev Template</title>
      </Head>
      <Box>
        <Markdown>{markdownDocs}</Markdown>
      </Box>
    </React.Fragment>
  );
}

export async function getStaticProps(context: any) {
  let { docsFile } = context.params;
  docsFile = docsFile.join('/');

  const docsUrl = `https://raw.githubusercontent.com/${GITHUB_DOCS_REPO}/${GITHUB_DOCS_REPO_MAIN_BRANCH}/${GITHUB_DOCS_REPO_TREE_PATH}/${docsFile}/index.md`;

  const getTextFromUrlService = new GetTextFromUrlService();
  const markdownDocs = await getTextFromUrlService.execute(docsUrl);

  return {
    props: { markdownDocs, docsName: docsFile.replace('/', ' ') },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths: any[] = [];

  const mainAccountGithubAccessToken =
    process.env.GITHUB_MAIN_ACCOUNT_ACCESS_TOKEN;

  const githubGetRepoTree = new GithubGetRepoTree(
    mainAccountGithubAccessToken || '',
  );
  const tree = await githubGetRepoTree.execute(
    GITHUB_DOCS_REPO,
    GITHUB_DOCS_REPO_MAIN_BRANCH,
  );
  const baseDocsFolder = tree.find(f => f.path === GITHUB_DOCS_REPO_TREE_PATH);
  if (!baseDocsFolder) {
    return { paths, fallback: true };
  }

  const pathsString = autoConvertJSONToPaths(baseDocsFolder);
  pathsString.forEach(path => {
    if (!PATHS_ADD_BY_STATIC_WAY.includes(path)) {
      paths.push({
        params: { docsFile: path.replace('docs/', '').split('/') },
      });
    }
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
