import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { IGitHubRepository } from '../../../interfaces/IGithub';
import { GithubGetAllReposLoggedUser } from '../../../services/github/GithubGetAllReposLoggedUser';

interface props {
  onSelectedGithubRepository: (
    repository: IGitHubRepository | undefined,
  ) => void;
  label: string;
  description?: string;
}

export function SearchForOwnRepositoriesOnGithub({
  onSelectedGithubRepository,
  label,
  description,
}: props) {
  const { data: session } = useSession();
  const [githubRepositories, setGithubRepositories] = React.useState<
    IGitHubRepository[]
  >([]);
  const [githubRepositoriesOption, setGithubRepositoriesOption] =
    React.useState<string[]>([]);
  const [selectedGithubRepository, setSelectedGithubRepository] =
    React.useState<IGitHubRepository>();
  const [open, setOpen] = React.useState(false);
  const loading = open && githubRepositoriesOption.length === 0;

  const getGithubRepositories = useCallback(async () => {
    const accessToken = session?.account.access_token || '';
    const githubGetAllReposLoggedUser = new GithubGetAllReposLoggedUser(
      accessToken,
    );
    const repositories = await githubGetAllReposLoggedUser.execute();
    if (repositories && repositories.length) {
      setGithubRepositories(repositories);
    }
  }, [session?.account.access_token]);

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
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={githubRepositoriesOption}
      onSelect={event => {
        handleSelectedGithubRepository((event.target as any).value);
      }}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          helperText={description}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
