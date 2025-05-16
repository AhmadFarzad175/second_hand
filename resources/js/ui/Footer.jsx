import { 
  Box, 
  Container, 
  Grid, 
  Link, 
  Typography, 
  // Divider,
  // Button,
  // TextField
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  LocalOffer, 
  Security, 
  Help, 
  ContactMail 
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        // backgroundColor: 'custom.dark',
        color: 'custom.#222',
        py: 6,
        mt:8,
        fontFamily: '"Source Code Pro", monospace',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                color: 'secondary.light'
              }}
            >
              SecondHand Pro
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sustainable shopping through quality pre-owned items. 
              Join our circular economy movement.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit">
                <Facebook fontSize="medium" />
              </Link>
              <Link href="#" color="inherit">
                <Twitter fontSize="medium" />
              </Link>
              <Link href="#" color="inherit">
                <Instagram fontSize="medium" />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn fontSize="medium" />
              </Link>
              </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              <LocalOffer fontSize="small" sx={{ mr: 1, color: 'secondary.light' }} />
              Categories
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Electronics
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Home & Garden
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Fashion
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Collectibles
            </Link>
          </Grid>

          {/* Support */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              <Help fontSize="small" sx={{ mr: 1, color: 'secondary.light' }} />
              Support
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Safety Center
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Seller Guide
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Buyer Guide
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              FAQs
            </Link>
          </Grid>

          {/* Legal */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              <Security fontSize="small" sx={{ mr: 1, color: 'secondary.light' }} />
              Legal
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Terms
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Privacy
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Cookies
            </Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              <ContactMail fontSize="small" sx={{ mr: 1, color: 'secondary.light' }} />
              Contact
            </Typography>
            <Typography variant="body2" display="block" mb={1}>
              support@secondhandpro.com
            </Typography>
            <Typography variant="body2" display="block" mb={1}>
              +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>

        {/* <Divider sx={{ 
          my: 4, 
          backgroundColor: 'secondary.main',
          opacity: 0.5
        }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} SecondHand Pro. All rights reserved.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: { xs: 2, sm: 0 },
            '& .MuiLink-root': {
              transition: 'color 0.3s',
              '&:hover': {
                color: 'secondary.light'
              }
            }
          }}>
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Accessibility
            </Link>
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Sitemap
            </Link>
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Careers
            </Link>
          </Box>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Footer;