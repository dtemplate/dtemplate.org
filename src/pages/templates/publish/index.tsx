import {
  Autocomplete,
  Box,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useCallback, useEffect } from 'react';
import { GetUserReposFromUsernameService } from '../../../services/github/GetUserReposFromUsernameService';

export default function PublishTemplate() {
  const { status, data: session } = useSession();
  const [githubRepositories, setGithubRepositories] = React.useState<any[]>([]);
  const [githubRepositoriesOption, setGithubRepositoriesOption] =
    React.useState<string[]>([]);
  const [selectedGithubRepository, setSelectedGithubRepository] =
    React.useState<any>();

  const getGithubRepositories = useCallback(
    async (username: string, accessToken?: string) => {
      const getUserReposFromUsername = new GetUserReposFromUsernameService(
        accessToken,
      );
      const repositories = await getUserReposFromUsername.execute(username);
      setGithubRepositories(repositories);
    },
    [],
  );

  const handleSelectedGithubRepository = useCallback(
    (repositoryFullName: string) => {
      const repository = githubRepositories.find(
        repository => repository.full_name === repositoryFullName,
      );
      setSelectedGithubRepository(repository);
    },
    [githubRepositories],
  );

  useEffect(() => {
    if (githubRepositories && githubRepositories.length) {
      setGithubRepositoriesOption(
        githubRepositories.map((repository: any) => repository.full_name),
      );
    }
  }, [githubRepositories]);

  useEffect(() => {
    if (session?.githubUser) {
      getGithubRepositories(
        (session?.githubUser as any).login as string,
        (session?.githubUser as any).github_access_token,
      );
    }
  }, [session, getGithubRepositories]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/api/auth/signin';
    }
  }, [status]);

  useEffect(() => {
    console.log('Example: ', selectedGithubRepository);
  }, [selectedGithubRepository]);

  return (
    <React.Fragment>
      <Head>
        <title>Publish your own template | Dev Template</title>
      </Head>
      <Box>
        <Typography variant="h1">Publish a template</Typography>
        <Typography variant="subtitle1">
          If you&apos;re a programmer, chances are you&apos;ve created your own
          folder structures for various programming projects. Why not share them
          with the world? Publishing your template (folder structure) can help
          other people start their own projects faster.
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 5,
        }}
      >
        <FormControl fullWidth>
          <Autocomplete
            id="github-repository-autocomplete"
            options={githubRepositoriesOption}
            onSelect={event => {
              handleSelectedGithubRepository((event.target as any).value);
            }}
            renderInput={params => (
              <TextField {...params} label="Github repository" />
            )}
          />
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
