import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import GitHubIcon from '@mui/icons-material/GitHub';

import Image from 'next/image';
import DevTemplateIcon from '../../assets/images/icon.png';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface IPage {
  name: string;
  href: string;
  buttonVariant: 'text' | 'outlined';
}

const settings = [
  {
    name: 'Logout',
    href: '/api/auth/signout',
  },
];

export default function Header() {
  const [pages, setPages] = React.useState<IPage[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const isCurrentPage = React.useCallback(
    (pageHref: string): boolean => {
      const { pathname } = router;
      console.log(pathname);
      if (pathname === '/') {
        return false;
      }
      return pathname.startsWith(pageHref);
    },
    [router],
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    let ALL_PAGES: IPage[] = [
      {
        name: 'Documentation',
        href: '/docs',
        buttonVariant: 'text',
      },
      {
        name: 'Templates',
        href: '/templates',
        buttonVariant: 'text',
      },
    ];

    ALL_PAGES = ALL_PAGES.map(page => {
      return {
        ...page,
        buttonVariant: isCurrentPage(page.href) ? 'outlined' : 'text',
      };
    });

    setPages(ALL_PAGES);
  }, [isCurrentPage, router]);

  return (
    <AppBar
      color="default"
      position="static"
      sx={{
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
            <Link href="/">
              <a>
                <Image
                  height={50}
                  width={50}
                  src={DevTemplateIcon}
                  alt="Dev template logo"
                />
              </a>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {session ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={session?.user?.image || ''} />
                </IconButton>
              </Tooltip>
            ) : (
              <Link href="/api/auth/signin">
                <a>
                  <Button
                    variant="contained"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    Login
                  </Button>
                </a>
              </Link>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem onClick={handleCloseNavMenu} key={page.name}>
                  <Link href={page.href}>
                    <a>
                      <Typography textAlign="center">{page.name}</Typography>
                    </a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{ gap: 5, flexGrow: 0, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map(page => (
              <Link key={page.name} href={page.href}>
                <a>
                  <Button
                    variant={page.buttonVariant}
                    color="primary"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </a>
              </Link>
            ))}
            <IconButton sx={{ p: 0 }}>
              <a
                href="https://github.com/dtemplate"
                target="_blank"
                rel="noopener noreferrer"
                title="Dtemplate on GitHub"
              >
                <GitHubIcon />
              </a>
            </IconButton>
            {session ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={session?.user?.image || ''} />
                </IconButton>
              </Tooltip>
            ) : (
              <Link href="/api/auth/signin">
                <a>
                  <Button
                    variant="contained"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: 'block' }}
                  >
                    Login
                  </Button>
                </a>
              </Link>
            )}
          </Box>
        </Toolbar>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map(setting => (
            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
              <Link href={setting.href}>
                <a>
                  <Typography textAlign="center">{setting.name}</Typography>
                </a>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </AppBar>
  );
}
