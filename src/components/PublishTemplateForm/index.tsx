import { FormControl } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { IGitHubRepository } from '../../interfaces/IGithub';
import { SearchForOwnRepositoriesOnGithub } from '../Inputs/SearchForOwnRepositoriesOnGithub';

export function PublishTemplateForm() {
  const [selectedGithubRepository, setSelectedGithubRepository] = useState<
    IGitHubRepository | undefined
  >();

  const handleChangeGithubSelectedRepository = useCallback(
    (repository: IGitHubRepository | undefined) => {
      setSelectedGithubRepository(repository);
    },
    [],
  );

  return (
    <FormControl fullWidth>
      <SearchForOwnRepositoriesOnGithub
        onSelectedGithubRepository={handleChangeGithubSelectedRepository}
      />
      {selectedGithubRepository && (
        <p>You selected: {selectedGithubRepository.full_name}</p>
      )}
    </FormControl>
  );
}
