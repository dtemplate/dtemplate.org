import { ListAllTemplatesService } from '../../modules/templates/services/ListAllTemplatesService';
import { ITemplate } from '../../interfaces/ITemplate';
import { GetTemplateByNameService } from '../../modules/templates/services/GetTemplateByNameService';
import React from 'react';
import Head from 'next/head';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
} from '@mui/material';
import { Markdown } from '../../components/Markdown';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface IProps {
  template: ITemplate | any;
}

export default function templatePage({ template }: IProps) {
  const commandToUseString =
    '\n ```console\ndt new -t ' +
    template.templateConfiguration.name +
    '\n```\n';

  return (
    <React.Fragment>
      <Head>
        <title>
          Template {template.templateConfiguration.name} | Dev Template
        </title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
        }}
      >
        <Box
          sx={{
            maxWidth: '700px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '1.5rem',
            }}
          >
            Template: {template.templateConfiguration.name}
          </Typography>
          <Typography variant="caption">
            {template.downloadCount || 0} download
            {(template.downloadCount || 0) > 1 ? 's' : ''}
          </Typography>
          <Typography variant="subtitle1">
            {template.templateConfiguration.description}
          </Typography>
        </Box>
        <Box
          sx={{
            minWidth: '400px',
            width: { xs: '100%', md: '400px' },
            mt: { xs: 2, md: 0 },
            ml: { xs: 0, md: 'auto' },
          }}
        >
          <Markdown>{commandToUseString}</Markdown>
          <Box
            sx={{
              px: 2,
              color: 'text.secondary',
            }}
          >
            <Typography variant="caption">
              Enter your project folder and type the above command to use the
              template
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Card
          sx={{
            mt: 2,
          }}
        >
          <CardHeader
            component={() => (
              <Box>
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    color: 'text.secondary',
                    gap: 1,
                  }}
                >
                  <MenuBookIcon />
                  <a
                    href={`https://github.com/${template.githubRepository.full_name}/blob/${template.githubRepository.default_branch}/README.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography>README.md</Typography>
                  </a>
                </Box>
                <Divider />
              </Box>
            )}
          />
          <CardContent>
            <Markdown>{template.readme}</Markdown>
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
  const { templates } = await listAllTemplatesService.execute({
    limit: 10000,
    page: 0,
    search: '',
    order: 'createdAt',
  });

  templates.forEach((template: any) => {
    paths.push({
      params: {
        templateName: template.templateConfiguration.name,
      },
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
