import { ListAllTemplatesService } from '../../modules/templates/services/ListAllTemplatesService';
import { ITemplate } from '../../interfaces/ITemplate';
import { GetTemplateByNameService } from '../../modules/templates/services/GetTemplateByNameService';
import React from 'react';
import Head from 'next/head';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { CopyBlock, dracula } from 'react-code-blocks';
import ReactMarkdown from 'react-markdown';

interface IProps {
  template: ITemplate | any;
}

export default function templatePage({ template }: IProps) {
  return (
    <React.Fragment>
      <Head>
        <title>
          Template {template.templateConfiguration.name} | Dev Template
        </title>
      </Head>
      <Box>
        <Typography variant="h1">
          Template: {template.templateConfiguration.name}
        </Typography>
        <Typography variant="subtitle1">
          {template.templateConfiguration.description}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <CopyBlock
          text={`dt new -t ${template.templateConfiguration.name}`}
          language="shell"
          theme={dracula}
          codeBlock
          showLineNumbers={false}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <Typography variant="h2">Readme:</Typography>
        <Card
          sx={{
            mt: 2,
            p: 1,
          }}
        >
          <CardContent>
            <ReactMarkdown
              components={{
                h1: (props: any) => <Typography variant="h1" {...props} />,
                h2: (props: any) => <Typography variant="h2" {...props} />,
                h3: (props: any) => <Typography variant="h3" {...props} />,
                h4: (props: any) => <Typography variant="h4" {...props} />,
                h5: (props: any) => <Typography variant="h5" {...props} />,
                h6: (props: any) => <Typography variant="h6" {...props} />,
                p: (props: any) => <Typography variant="body1" {...props} />,
                code: (props: any) => (
                  <CopyBlock
                    text={props.children}
                    language="shell"
                    theme={dracula}
                    codeBlock
                    showLineNumbers={false}
                  />
                ),
              }}
            >
              {template.readme}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}

export async function getStaticProps(context: any) {
  const { templateName } = context.params;
  const getTemplateByNameService = new GetTemplateByNameService();
  const template = await getTemplateByNameService.execute(templateName, {
    getReadme: true,
  });
  return {
    props: {
      template: JSON.parse(JSON.stringify(template)),
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths: {
    params: any;
  }[] = [];

  const listAllTemplatesService = new ListAllTemplatesService();
  const templates = await listAllTemplatesService.execute({
    limit: 10000,
    page: 0,
    search: '',
    order: 'createdAt',
  });

  templates.forEach(template => {
    paths.push({
      params: {
        templateName: template.templateConfiguration.name,
      },
    });
  });

  return {
    paths,
    fallback: true,
  };
}
