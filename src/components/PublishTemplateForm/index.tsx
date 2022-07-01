import { Alert, Box, Button, FormControl, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { IGitHubRepository, IGithubRepoTree } from '../../interfaces/IGithub';
import { ITemplateConfig } from '../../interfaces/ITemplate';
import { GithubGetFileContentFromUrl } from '../../services/github/GithubGetFileContentFromUrl';
import { GithubGetRepoTree } from '../../services/github/GithubGetRepoTree';
import { isInvalidTemplateConfigJsonFields } from '../../utils/isInvalidTemplateConfigJsonFields';
import { SearchForOwnRepositoriesOnGithub } from '../Inputs/SearchForOwnRepositoriesOnGithub';
import { SelectFolderFromGithubRepo } from '../Inputs/SelectFolderFromGithubRepo';

interface IProps {
  onSubmit: (data: any) => void;
}

export function PublishTemplateForm({ onSubmit }: IProps) {
  const { data: session } = useSession();
  const [selectedGithubRepository, setSelectedGithubRepository] = useState<
    IGitHubRepository | undefined
  >();
  const [repositoryTree, setRepositoryTree] = useState<IGithubRepoTree[]>([]);
  const [baseTemplateRepositoryTree, setBaseTemplateRepositoryTree] = useState<
    IGithubRepoTree | undefined
  >();
  const [configurationFileTree, setConfigurationFileTree] = useState<
    IGithubRepoTree | undefined
  >();
  const [templateConfiguration, setTemplateConfiguration] = useState<
    ITemplateConfig | undefined
  >();
  const [error, setError] = useState<string | undefined>();

  const handleGetRepositoryTree = useCallback(async () => {
    setError(undefined);
    if (!selectedGithubRepository) {
      return;
    }
    const githubGetRepoTree = new GithubGetRepoTree(
      session?.account.access_token || '',
    );
    const tree = await githubGetRepoTree.execute(
      selectedGithubRepository.full_name,
      selectedGithubRepository.default_branch,
    );
    setRepositoryTree(tree);
  }, [selectedGithubRepository, session]);

  const handleChangeGithubSelectedRepository = useCallback(
    (repository: IGitHubRepository | undefined) => {
      setError(undefined);
      setSelectedGithubRepository(repository);
    },
    [],
  );

  const handleBaseTemplateRepositoryTree = useCallback(
    (repositoryTree: IGithubRepoTree | undefined) => {
      setError(undefined);
      setBaseTemplateRepositoryTree(repositoryTree);
    },
    [],
  );

  const handleConfigurationFileTree = useCallback(
    (repositoryTree: IGithubRepoTree | undefined) => {
      setError(undefined);
      setConfigurationFileTree(repositoryTree);
    },
    [],
  );

  useEffect(() => {
    const load = async () => {
      setError(undefined);
      setTemplateConfiguration(undefined);
      if (configurationFileTree) {
        const githubGetFileContentFromUrl = new GithubGetFileContentFromUrl(
          session?.account.access_token || '',
        );
        const configFileContent = await githubGetFileContentFromUrl.execute(
          configurationFileTree.url,
          {
            convertToJSON: true,
          },
        );
        const isInvalid = isInvalidTemplateConfigJsonFields(configFileContent);
        if (isInvalid) {
          setError(isInvalid);
          return;
        }
        setTemplateConfiguration(configFileContent);
      }
    };
    load();
  }, [configurationFileTree, session]);

  useEffect(() => {
    handleGetRepositoryTree();
  }, [handleGetRepositoryTree]);

  const handlePublish = useCallback(async () => {
    const body = {
      githubRepository: {
        full_name: selectedGithubRepository?.full_name,
        default_branch: selectedGithubRepository?.default_branch,
        id: selectedGithubRepository?.id,
        url: selectedGithubRepository?.url,
        treeUrl: selectedGithubRepository?.trees_url,
      },
      baseTemplateRepositoryTreeUrl: baseTemplateRepositoryTree?.url,
      configurationFileTreeUrl: configurationFileTree?.url,
      templateConfiguration,
    };
    onSubmit(body);
  }, [
    selectedGithubRepository,
    baseTemplateRepositoryTree,
    configurationFileTree,
    templateConfiguration,
    onSubmit,
  ]);

  return (
    <FormControl fullWidth>
      {error && (
        <Box
          sx={{
            mb: 5,
          }}
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <SearchForOwnRepositoriesOnGithub
        label="Select a repository"
        onSelectedGithubRepository={handleChangeGithubSelectedRepository}
        description="Select a private or public github repository, where you have read access to it, and then we will fetch all the necessary code to build your template"
      />
      {selectedGithubRepository && (
        <Box
          sx={{
            mt: 2,
          }}
        >
          <SelectFolderFromGithubRepo
            allowTypes={['tree']}
            label="Select Folder"
            repositoryTree={repositoryTree}
            description="Select the folder where all the code, folder structure and files of your template are located, for example if your template creates an MVC api, inside this folder it must contain an MVC api, do not worry at this moment to install the dependencies or run the commands for your api to work"
            onSelectedRepositoryTree={handleBaseTemplateRepositoryTree}
          />
          {baseTemplateRepositoryTree && (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <SelectFolderFromGithubRepo
                allowTypes={['blob']}
                label="select a configuration file"
                repositoryTree={repositoryTree}
                description='here you need to select a file with the ".json" extension and all your template configuration will be based on that file'
                onSelectedRepositoryTree={handleConfigurationFileTree}
              />
              {templateConfiguration && (
                <>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <TextField
                      defaultValue={templateConfiguration.name}
                      disabled
                      fullWidth
                      label="Template name"
                      helperText="This is the name of your template, this name will be used to trigger your template, this must be a unique name, that there is not yet a template with the same name. Please change this in your config file, not here"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled
                      defaultValue={templateConfiguration.description}
                      label="Template description"
                      helperText="What does your template do? what is he? an api, a cli? describe your template here, this should be changed in your config file, not here"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      disabled
                      defaultValue={templateConfiguration.commands.join(', ')}
                      label="Template commands"
                      helperText={
                        'What commands need to be run to prepare this template so that the user just starts coding? example: git init, git commit -m "initial commit", yarn, yarn start. Don\'t change it here, change it in your config file, (with an array of strings)'
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      my: 5,
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handlePublish();
                      }}
                    >
                      Publish Template
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
      )}
    </FormControl>
  );
}
