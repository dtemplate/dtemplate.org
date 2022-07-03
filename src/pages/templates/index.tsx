import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import { ListAllTemplatesService } from '../../modules/templates/services/ListAllTemplatesService';
import { ITemplate } from '../../interfaces/ITemplate';
import { TemplateCard } from '../../components/TemplateCard';
import { SearchTemplate } from '../../components/Inputs/SearchTemplate';

interface IProps {
  templates: ITemplate[];
}

export default function TemplatesPage({ templates }: IProps) {
  const [allFilteredTemplates, setAllFilteredTemplates] = React.useState<
    ITemplate[]
  >([]);

  useEffect(() => {
    setAllFilteredTemplates(templates);
  }, [templates]);

  const handleOnChangeFoundTemplates = (templates: ITemplate[]) => {
    setAllFilteredTemplates(templates);
  };

  return (
    <React.Fragment>
      <Head>
        <title>All templates | Dev Template</title>
      </Head>
      <Box>
        <Typography variant="h1">Templates</Typography>
        <Typography variant="subtitle1">
          Templates are a set of instructions to create a structure, imagine you
          want to create an api in node.js, instead of needing to download and
          configure lint, commit patterns, typescript... just use an api
          template of nodejs and it will configure all this for you.
        </Typography>
        <Link href="/docs/templates">
          <a>Learn more</a>
        </Link>
      </Box>
      <Box
        sx={{
          my: 3,
        }}
      >
        <Link href="/templates/publish">
          <a>
            <Button variant="outlined">Publish a template</Button>
          </a>
        </Link>
      </Box>
      <Box>
        <SearchTemplate onChangeFoundTemplates={handleOnChangeFoundTemplates} />
      </Box>
      <Box>
        {allFilteredTemplates.length ? (
          <>
            {allFilteredTemplates.map(template => (
              <Box
                sx={{
                  mt: 3,
                }}
                key={template._id}
              >
                <TemplateCard template={template} />
              </Box>
            ))}
          </>
        ) : (
          <Typography variant="h2">No templates found</Typography>
        )}
      </Box>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const listAllTemplatesService = new ListAllTemplatesService();
  const templates = await listAllTemplatesService.execute({
    limit: 10000,
    page: 0,
    search: '',
    order: 'createdAt',
  });

  return {
    props: {
      templates: JSON.parse(JSON.stringify(templates)),
    },
    revalidate: 10,
  };
}
