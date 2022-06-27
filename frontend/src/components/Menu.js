import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { getFullImageUrl, groupBy } from '../utils'
import Link from '@mui/material/Link'
import { Collapse, ListItem, ListItemIcon, Stack } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { useState } from 'react'
import styled from '@emotion/styled'
import SnapButton from './SnapButton'

const drawerWidth = 240
const navItems = ['Home', 'About', 'Contact']

const Menu = ({ window, isOpen, onToggleMenu, menu }) => {
  const logo = menu.logo.data.attributes
  const links = menu.links
  const navigationLinks = groupBy(
    links.filter(link => !link.isUserFlow),
    'relatedTo',
  )
  const userLinks = links.filter(link => link.isUserFlow)
  const openMenuIcon = {
    url: getFullImageUrl(menu.menuIcon.data.attributes.url),
    alt: menu.menuIcon.data.attributes.alternativeText,
  }
  const closeMenuIcon = {
    url: getFullImageUrl(menu.closeMenuIcon.data.attributes.url),
    alt: menu.closeMenuIcon.data.attributes.alternativeText,
  }
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(
    setupInitialSubmenuState(navigationLinks),
  )

  const onSubmenuToggle = id => {
    if (!(id in navigationLinks)) return

    setSubmenuOpen({ ...submenuOpen, [id]: !submenuOpen[id] })
  }

  const onDrawerToggle = () => {
    setMobileOpen(!mobileOpen)

    // Hide all submenus when the drawer is closed
    if (!mobileOpen) {
      setSubmenuOpen(setupInitialSubmenuState(navigationLinks))
    }
  }

  const drawer = (
    <Stack>
      <IconButton
        color='inherit'
        aria-label='close drawer'
        edge='start'
        onClick={onDrawerToggle}
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
            <MenuItem key={link.id}>
              <ListItemButton
                component={hasSubmenu ? 'div' : 'a'}
                href={!hasSubmenu && '#'}
                onClick={
                  hasSubmenu
                    ? () => onSubmenuToggle(link.id)
                    : () => onDrawerToggle()
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
              {navigationLinks[link.id] &&
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
                          onClick={onDrawerToggle}
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
            </MenuItem>
          )
        })}
      </List>
      <List sx={{ padding: 0 }}>
        {userLinks.map(link => (
          <ListItem disablePadding sx={{ padding: '0.8rem 2rem' }}>
            <SnapButton
              key={link.id}
              variant={link.variant}
              component='a'
              href='#'
              onClick={onDrawerToggle}
              sx={{
                display: 'block',
                width: '100%',
              }}>
              {link.label}
            </SnapButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        elevation={0}
        sx={{
          background: theme => theme.palette.common.white,
        }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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
            onClick={onDrawerToggle}
            sx={{ display: { sm: 'none' } }}>
            <Box
              component='img'
              src={isOpen ? closeMenuIcon.url : openMenuIcon.url}
              alt={isOpen ? closeMenuIcon.alt : openMenuIcon.alt}
              width='90%'
            />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(item => (
              <SnapButton key={item} sx={{ color: '#fff' }}>
                {item}
              </SnapButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          anchor='right'
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              color: theme => theme.palette.neutral.mediumGray,
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
          quibusdam, aliquam dolore excepturi quae. Distinctio enim at eligendi
          perferendis in cum quibusdam sed quae, accusantium et aperiam? Quod
          itaque exercitationem, at ab sequi qui modi delectus quia corrupti
          alias distinctio nostrum. Minima ex dolor modi inventore sapiente
          necessitatibus aliquam fuga et. Sed numquam quibusdam at officia
          sapiente porro maxime corrupti perspiciatis asperiores, exercitationem
          eius nostrum consequuntur iure aliquam itaque, assumenda et! Quibusdam
          temporibus beatae doloremque voluptatum doloribus soluta accusamus
          porro reprehenderit eos inventore facere, fugit, molestiae ab officiis
          illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis,
          voluptatem! Cumque, eligendi unde aliquid minus quis sit debitis
          obcaecati error, delectus quo eius exercitationem tempore. Delectus
          sapiente, provident corporis dolorum quibusdam aut beatae repellendus
          est labore quisquam praesentium repudiandae non vel laboriosam quo ab
          perferendis velit ipsa deleniti modi! Ipsam, illo quod. Nesciunt
          commodi nihil corrupti cum non fugiat praesentium doloremque
          architecto laborum aliquid. Quae, maxime recusandae? Eveniet dolore
          molestiae dicta blanditiis est expedita eius debitis cupiditate porro
          sed aspernatur quidem, repellat nihil quasi praesentium quia eos,
          quibusdam provident. Incidunt tempore vel placeat voluptate iure
          labore, repellendus beatae quia unde est aliquid dolor molestias
          libero. Reiciendis similique exercitationem consequatur, nobis placeat
          illo laudantium! Enim perferendis nulla soluta magni error, provident
          repellat similique cupiditate ipsam, et tempore cumque quod! Qui, iure
          suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore
          commodi reprehenderit rerum reiciendis! Quidem alias repudiandae eaque
          eveniet cumque nihil aliquam in expedita, impedit quas ipsum nesciunt
          ipsa ullam consequuntur dignissimos numquam at nisi porro a, quaerat
          rem repellendus. Voluptates perspiciatis, in pariatur impedit, nam
          facilis libero dolorem dolores sunt inventore perferendis, aut
          sapiente modi nesciunt.
        </Typography>
      </Box>
    </Box>
  )
}
export default Menu

const MenuItem = styled(ListItem)(({ theme }) => ({
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
    result[key] = true
  }
  return result
}
