import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { IGithubRepoTree } from '../../../interfaces/IGithub';

interface IProps {
  label: string;
  description?: string;
  repositoryTree: IGithubRepoTree[];
  allowTypes?: string[];
  onSelectedRepositoryTree: (
    repositoryTree: IGithubRepoTree | undefined,
  ) => void;
}

export function SelectFolderFromGithubRepo({
  label,
  description,
  repositoryTree,
  onSelectedRepositoryTree,
  allowTypes,
}: IProps) {
  const [open, setOpen] = useState(false);
  const loading = open && repositoryTree.length === 0;
  const autoC: any = useRef(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const handleOnSelectedRepositoryTree = useCallback(
    (path: string) => {
      setErrorMessage(undefined);
      const repositoryTreeItem: IGithubRepoTree | undefined =
        repositoryTree.find(
          repositoryTreeItem =>
            repositoryTreeItem.path === path ||
            repositoryTreeItem.children.find(
              repositoryTreeItem => repositoryTreeItem.path === path,
            ),
        );
      if (!allowTypes) {
        onSelectedRepositoryTree(repositoryTreeItem);
        return;
      }
      if (!allowTypes?.includes(repositoryTreeItem?.type || '')) {
        autoC.current.value = '';
        onSelectedRepositoryTree(undefined);
        setErrorMessage(
          `Invalid type, please select something like: ${allowTypes.join(
            ', ',
          )}`,
        );
        return;
      }
      onSelectedRepositoryTree(repositoryTreeItem);
    },
    [repositoryTree, onSelectedRepositoryTree, allowTypes],
  );

  return (
    <Autocomplete
      ref={autoC}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onSelect={(event: any) => {
        handleOnSelectedRepositoryTree(event.target.value);
      }}
      isOptionEqualToValue={(option, value) => option.path === value.path}
      getOptionLabel={option => option.path}
      options={repositoryTree}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          helperText={errorMessage || description}
          error={!!errorMessage}
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
