import { IconButton, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IPagination } from '../../../interfaces/IPagination';

interface IProps {
  onChangeFoundTemplates: (result: IPagination) => void;
}

export function SearchTemplate({ onChangeFoundTemplates }: IProps) {
  const handleSearch = useCallback(
    async (term: string) => {
      const response = await fetch(
        '/api/templates?page=1&limit=10&order=createdAt&search=' + term,
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
