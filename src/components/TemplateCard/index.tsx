import { Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { ITemplate } from '../../interfaces/ITemplate';
import styles from './styles.module.css';

interface IProps {
  template: ITemplate;
}

export function TemplateCard({ template }: IProps) {
  console.log(template);
  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">
            {template.templateConfiguration.name}
          </Typography>
          <Typography color="text.secondary">
            {template.templateConfiguration.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <a
              className={styles.a}
              href={`https://github.com/${template.githubRepository.full_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/{template.githubRepository.full_name}
            </a>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Commands: {template.templateConfiguration.commands.join(', ')}
          </Typography>
          <Typography>
            <Link href={`/templates/${template.templateConfiguration.name}`}>
              <a>Learn More</a>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
