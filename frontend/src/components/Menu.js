import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { getFullImageUrl, groupBy } from '../utils'
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
import useMediaQuery from '@mui/material/useMediaQuery'

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const [submenuOpen, setSubmenuOpen] = useState(
    setupInitialSubmenuState(navigationLinks),
  )

  const onSubmenuToggle = id => {
    if (!(id in navigationLinks)) return

    setSubmenuOpen({ ...submenuOpen, [id]: !submenuOpen[id] })
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)

    // Hide all submenus when the drawer is closed
    if (!mobileOpen) {
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
    if (matchesSmallScreen && mobileOpen) {
      setMobileOpen(false)
    }
  }, [matchesSmallScreen, mobileOpen])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        elevation={0}
        sx={{
          background: theme => theme.palette.common.white,
          color: theme => theme.palette.neutral.mediumGray,
        }}>
        <Toolbar>
          <Link underline='none' href='#' display='flex'>
            <Box
              component='img'
              src={getFullImageUrl(logo.url)}
              alt={logo.alternativeText}
              width='85%'
            />
          </Link>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, ml: 'auto' }}>
            <Box
              component='img'
              src={mobileOpen ? closeMenuIcon.url : openMenuIcon.url}
              alt={mobileOpen ? closeMenuIcon.alt : openMenuIcon.alt}
              width='90%'
            />
          </IconButton>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <List
              sx={{ display: 'flex', width: '100%' }}
              aria-labelledby='menu'>
              {navigationLinks['null'].map(link => {
                const hasSubmenu = link.id in navigationLinks
                return (
                  <Box key={link.id}>
                    <SnapButton
                      id={link.id}
                      component='li'
                      href={!hasSubmenu ? '#' : undefined}
                      onClick={(event, id) => handleOpenSubmenu(event, link.id)}
                      sx={{ display: 'flex' }}>
                      <Typography
                        variant='subtitle1'
                        component='span'
                        sx={{
                          marginRight: hasSubmenu ? '1.2rem' : 0,
                        }}>
                        {link.label}
                      </Typography>
                      {hasSubmenu ? (
                        submenuOpen[link.id] ? (
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
                        }}>
                        {navigationLinks[link.id].map(sublink => {
                          const icon = sublink.icon.data?.attributes
                          return (
                            <MenuItem
                              key={sublink.id}
                              onClick={() => handleCloseSubmenu(link.id)}>
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
                              {sublink.label}
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
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          anchor='right'
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box>
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
