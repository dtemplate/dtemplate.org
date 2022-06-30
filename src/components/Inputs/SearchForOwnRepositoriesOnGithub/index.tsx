import { Autocomplete, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { IGitHubRepository } from '../../../interfaces/IGithub';
import { GithubGetAllReposLoggedUser } from '../../../services/github/GithubGetAllReposLoggedUser';

interface props {
  onSelectedGithubRepository: (
    repository: IGitHubRepository | undefined,
  ) => void;
}

export function SearchForOwnRepositoriesOnGithub({
  onSelectedGithubRepository,
}: props) {
  const { data: session } = useSession();
  const [githubRepositories, setGithubRepositories] = React.useState<
    IGitHubRepository[]
  >([]);
  const [githubRepositoriesOption, setGithubRepositoriesOption] =
    React.useState<string[]>([]);
  const [selectedGithubRepository, setSelectedGithubRepository] =
    React.useState<IGitHubRepository>();

  const getGithubRepositories = useCallback(async () => {
    const accessToken = session?.account.access_token || '';
    const githubGetAllReposLoggedUser = new GithubGetAllReposLoggedUser(
      accessToken,
    );
    const repositories = await githubGetAllReposLoggedUser.execute();
    if (repositories && repositories.length) {
      setGithubRepositories(repositories);
    }
  }, [session]);

  const handleSelectedGithubRepository = useCallback(
    (repositoryFullName: string) => {
      if (githubRepositories && githubRepositories.length) {
        const repository = githubRepositories.find(
          repository => repository.full_name === repositoryFullName,
        );
        setSelectedGithubRepository(repository);
      }
    },
    [githubRepositories],
  );

  useEffect(() => {
    if (githubRepositories && githubRepositories.length) {
      setGithubRepositoriesOption(
        githubRepositories.map(repository => repository.full_name),
      );
    }
  }, [githubRepositories]);

  useEffect(() => {
    if (session?.account) {
      getGithubRepositories();
    }
  }, [session, getGithubRepositories]);

  useEffect(() => {
    onSelectedGithubRepository(selectedGithubRepository);
  }, [selectedGithubRepository, onSelectedGithubRepository]);

  return (
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
  );
}
