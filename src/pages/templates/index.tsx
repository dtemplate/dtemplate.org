import React, { useCallback, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';
import { ListAllTemplatesService } from '../../modules/templates/services/ListAllTemplatesService';
import { ITemplate } from '../../interfaces/ITemplate';
import { TemplateCard } from '../../components/TemplateCard';
import { SearchTemplate } from '../../components/Inputs/SearchTemplate';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPagination } from '../../interfaces/IPagination';

interface IProps {
  result: IPagination;
}

export default function TemplatesPage({ result }: IProps) {
  const [allFilteredTemplates, setAllFilteredTemplates] = React.useState<
    ITemplate[]
  >([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [order, setOrder] = React.useState('');

  useEffect(() => {
    setAllFilteredTemplates(result.templates);
    handleSetPaginationParams(result);
  }, [result]);

  const handleOnChangeFoundTemplates = (searchResult: IPagination) => {
    setAllFilteredTemplates(searchResult.templates);
    handleSetPaginationParams(searchResult);
  };

  const handleAddTemplates = useCallback((addResult: IPagination) => {
    setAllFilteredTemplates(old => [...old, ...addResult.templates]);
    handleSetPaginationParams(addResult);
  }, []);

  const handleSetPaginationParams = (paginationParams: IPagination) => {
    setTotal(paginationParams.total);
    setPage(paginationParams.page);
    setLimit(paginationParams.limit);
    setSearch(paginationParams.search);
    setOrder(paginationParams.order);
  };

  const handleGetNextPage = useCallback(async () => {
    const nextPage = page + 1;
    const nextLimit = limit;
    if (nextPage <= total) {
      const response = await fetch(
        `/api/templates?page=${nextPage}&limit=${nextLimit}&order=${order}&search=${search}`,
      );
      const { result } = await response.json();
      handleAddTemplates(result);
    }
  }, [page, total, limit, handleAddTemplates, search, order]);

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
      <InfiniteScroll
        dataLength={allFilteredTemplates.length}
        next={handleGetNextPage}
        hasMore={page * limit < total}
        loader={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <CircularProgress color="inherit" size={20} />
          </Box>
        }
        endMessage={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
            }}
          >
            <Typography variant="h4" align="center">
              You have seen all templates
            </Typography>
          </Box>
        }
      >
        <Box>
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
        </Box>
      </InfiniteScroll>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const LIMIT = 100;

  const listAllTemplatesService = new ListAllTemplatesService();
  const result = await listAllTemplatesService.execute({
    limit: LIMIT,
    page: 1,
    search: '',
    order: 'createdAt',
  });

  return {
    props: {
      result,
    },
    revalidate: 10,
  };
}
