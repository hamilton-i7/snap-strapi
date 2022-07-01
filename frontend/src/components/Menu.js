import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { getFullImageUrl, groupBy, useTabletScreenMatcher } from '../utils'
import Link from '@mui/material/Link'
import {
  Collapse,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import SnapButton from './SnapButton'
import { useTheme } from '@mui/material/styles'

const drawerWidth = 240

const SnapMenu = ({ window, menu, children }) => {
  const logo = menu.logo.data.attributes
  const links = menu.links
  const navigationLinks = groupBy(
    links.filter(link => !link.isUserFlow),
    'relatedTo',
  )
  const userLinks = links.filter(link => link.isUserFlow)

  // Collapsed menu controls
  const openMenuIcon = {
    url: getFullImageUrl(menu.menuIcon.data.attributes.url),
    alt: menu.menuIcon.data.attributes.alternativeText,
  }
  const closeMenuIcon = {
    url: getFullImageUrl(menu.closeMenuIcon.data.attributes.url),
    alt: menu.closeMenuIcon.data.attributes.alternativeText,
  }
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const matchesTabletScreen = useTabletScreenMatcher(theme)
  const [submenuOpen, setSubmenuOpen] = useState(
    setupInitialSubmenuState(navigationLinks),
  )

  const onSubmenuToggle = id => {
    if (!(id in navigationLinks)) return

    setSubmenuOpen({ ...submenuOpen, [id]: !submenuOpen[id] })
  }
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)

    // Hide all submenus when the drawer is closed
    if (!drawerOpen) {
      setSubmenuOpen(setupInitialSubmenuState(navigationLinks))
    }
  }

  // Expanded menu controls
  const [anchorLinks, setAnchorLinks] = useState(
    setupAnchorLinks(navigationLinks),
  )

  const handleOpenSubmenu = (e, id) => {
    setAnchorLinks({
      ...anchorLinks,
      [id]: e.currentTarget,
    })
  }
  const handleCloseSubmenu = id => {
    setAnchorLinks({
      ...anchorLinks,
      [id]: null,
    })
  }

  const drawer = (
    <Stack>
      <IconButton
        color='inherit'
        aria-label='close drawer'
        edge='start'
        onClick={handleDrawerToggle}
        sx={{ alignSelf: 'end', margin: '1.2rem' }}>
        <Box
          component='img'
          src={closeMenuIcon.url}
          alt={closeMenuIcon.alt}
          sx={{ width: '90%' }}
        />
      </IconButton>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        aria-labelledby='menu'>
        {navigationLinks['null'].map(link => {
          const hasSubmenu = link.id in navigationLinks
          return (
            <MobileMenuItem key={link.id}>
              <ListItemButton
                component={hasSubmenu ? 'div' : 'a'}
                href={!hasSubmenu ? '#' : undefined}
                onClick={
                  hasSubmenu
                    ? () => onSubmenuToggle(link.id)
                    : () => handleDrawerToggle()
                }>
                <ListItemText
                  primary={link.label}
                  sx={{
                    marginRight: hasSubmenu ? '1.2rem' : 0,
                  }}
                />
                {hasSubmenu ? (
                  submenuOpen[link.id] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
              {hasSubmenu &&
                navigationLinks[link.id].map(sublink => {
                  const icon = sublink.icon.data?.attributes
                  return (
                    <Collapse
                      key={sublink.id}
                      in={submenuOpen[link.id]}
                      timeout='auto'
                      unmountOnExit
                      sx={{ paddingLeft: '2rem', width: '100%' }}>
                      <List component='div' disablePadding>
                        <ListItemButton
                          onClick={handleDrawerToggle}
                          component='a'
                          href='#'
                          sx={{ pl: 4 }}>
                          {icon?.url && (
                            <ListItemIcon
                              sx={{ minWidth: 0, marginRight: '1.2rem' }}>
                              <Box
                                component='img'
                                src={getFullImageUrl(icon?.url)}
                                alt={icon?.alternativeText}
                              />
                            </ListItemIcon>
                          )}
                          <ListItemText primary={sublink.label} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  )
                })}
            </MobileMenuItem>
          )
        })}
      </List>
      <List sx={{ padding: 0 }}>
        {userLinks.map(link => (
          <ListItem
            key={link.id}
            disablePadding
            sx={{ padding: '0.8rem 2rem' }}>
            <SnapButton
              variant={link.variant}
              component='a'
              href='#'
              onClick={handleDrawerToggle}
              fullWidth>
              {link.label}
            </SnapButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  useEffect(() => {
    if (matchesTabletScreen && drawerOpen) {
      setDrawerOpen(false)
    }
  }, [matchesTabletScreen, drawerOpen])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='header'
        elevation={0}
        sx={{
          background: theme => theme.palette.common.white,
          color: theme => theme.palette.neutral.mediumGray,
        }}>
        <Toolbar component='nav' sx={{ gap: { sm: '1.2rem' } }}>
          <Link underline='none' href='#' display='flex'>
            <Box
              component='img'
              src={getFullImageUrl(logo.url)}
              alt={logo.alternativeText}
              sx={{
                width: '80%',
              }}
            />
          </Link>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { tablet: 'none' }, ml: 'auto' }}>
            <Box
              component='img'
              src={drawerOpen ? closeMenuIcon.url : openMenuIcon.url}
              alt={drawerOpen ? closeMenuIcon.alt : openMenuIcon.alt}
              width='90%'
            />
          </IconButton>
          <Box
            sx={{
              display: { xs: 'none', tablet: 'flex' },
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <List
              sx={{ display: 'flex', width: '100%' }}
              aria-labelledby='menu'>
              {navigationLinks['null'].map(link => {
                const hasSubmenu = link.id in navigationLinks
                return (
                  <Box key={link.id} component='li'>
                    <SnapButton
                      id={link.id}
                      href={!hasSubmenu ? '#' : undefined}
                      component={!hasSubmenu ? 'a' : 'button'}
                      onClick={event => handleOpenSubmenu(event, link.id)}
                      sx={{ display: 'flex' }}>
                      <Typography
                        variant='button'
                        component='span'
                        sx={{
                          marginRight: hasSubmenu ? '0.4rem' : 0,
                        }}>
                        {link.label}
                      </Typography>
                      {hasSubmenu ? (
                        Boolean(anchorLinks[link.id]) ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : null}
                    </SnapButton>
                    {hasSubmenu && (
                      <Menu
                        id='basic-menu'
                        anchorEl={anchorLinks[link.id]}
                        open={Boolean(anchorLinks[link.id])}
                        onClose={() => handleCloseSubmenu(link.id)}
                        MenuListProps={{
                          'aria-labelledby': link.id,
                        }}
                        sx={{
                          '& .MuiPaper-root': {
                            borderRadius: '1.2rem',
                            mt: '1rem',
                            padding: '1rem 0',
                          },
                        }}>
                        {navigationLinks[link.id].map(sublink => {
                          const icon = sublink.icon.data?.attributes
                          return (
                            <MenuItem
                              key={sublink.id}
                              onClick={() => handleCloseSubmenu(link.id)}
                              sx={{
                                alignItems: 'end',
                                color: theme =>
                                  theme.palette.neutral.mediumGray,
                                padding: '0.6rem 2.4rem',
                              }}>
                              {icon?.url && (
                                <ListItemIcon
                                  sx={{
                                    marginRight: '1.2rem',
                                    '&.MuiListItemIcon-root': {
                                      minWidth: 'auto',
                                    },
                                  }}>
                                  <Box
                                    component='img'
                                    src={getFullImageUrl(icon?.url)}
                                    alt={icon?.alternativeText}
                                  />
                                </ListItemIcon>
                              )}
                              <ListItemText
                                primary={sublink.label}
                                primaryTypographyProps={{
                                  lineHeight: 1,
                                  variant: 'body2',
                                }}
                                sx={{
                                  lineHeight: 1,
                                }}
                              />
                            </MenuItem>
                          )
                        })}
                      </Menu>
                    )}
                  </Box>
                )
              })}
            </List>
            <List sx={{ display: 'flex', padding: 0 }}>
              {userLinks.map(link => (
                <ListItem
                  key={link.id}
                  disablePadding
                  sx={{ padding: { sm: '0.8rem 1.2rem', md: '0.8rem 2rem' } }}>
                  <SnapButton
                    variant={link.variant}
                    component='a'
                    href='#'
                    onClick={handleDrawerToggle}
                    fullWidth>
                    {link.label}
                  </SnapButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          anchor='right'
          container={container}
          variant='temporary'
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', tablet: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box width='100%'>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
export default SnapMenu

const MobileMenuItem = styled(ListItem)(({ theme }) => ({
  flexDirection: 'column',
  padding: 0,
  '& .MuiListItemButton-root': {
    padding: '0.4rem 2rem',
    width: '100%',
  },
  '& .MuiListItemText-root': {
    flex: 'none',
  },
  '& .MuiListItemText-primary': {
    fontSize: theme.typography.subtitle1.fontSize,
    textTransform: 'capitalize',
  },
}))

/**
 * Sets the initial state for all submenus on the navigation to false
 * @param {Object} groupedLinks - The navigation links grouped by heriarchy.
 * @returns {Object} The initial state for the submenus grouped by their parents' IDs
 */

const setupInitialSubmenuState = groupedLinks => {
  const result = {}
  for (const key of Object.keys(groupedLinks)) {
    if (key === null) continue
    result[key] = false
  }
  return result
}

const setupAnchorLinks = groupedLinks => {
  const result = {}
  for (const key of Object.keys(groupedLinks)) {
    if (key === null) continue
    result[key] = null
  }
  return result
}
