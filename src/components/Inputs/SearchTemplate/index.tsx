import { IconButton, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ITemplate } from '../../../interfaces/ITemplate';

interface IProps {
  onChangeFoundTemplates: (templates: ITemplate[]) => void;
}

export function SearchTemplate({ onChangeFoundTemplates }: IProps) {
  const handleSearch = useCallback(
    async (term: string) => {
      const response = await fetch(
        '/api/templates?page=0&limit=10&order=createdAt&search=' + term,
      );
      const { result: templates } = await response.json();
      onChangeFoundTemplates(templates);
    },
    [onChangeFoundTemplates],
  );

  return (
    <React.Fragment>
      <TextField
        id="search-template-input"
        fullWidth
        label="Search Template"
        variant="outlined"
        onKeyUp={(e: any) => {
          if (e.keyCode === 13) {
            handleSearch(e.target.value);
          }
        }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                handleSearch(
                  (document.getElementById('search-template-input') as any)
                    .value,
                );
              }}
            >
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </React.Fragment>
  );
}
