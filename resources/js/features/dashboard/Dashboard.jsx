import React from "react";
import {
    Box,
    Typography,
    Paper,
    styled,
    Divider,
    Stack,
    Chip,
    Avatar,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    ShoppingCart,
    People,
    AttachMoney,
    Category,
    Star,
    Report,
} from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";

// Styled components
const StatCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[6],
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: "inline-flex",
    padding: theme.spacing(1.5),
    borderRadius: "50%",
    color: "white",
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
}));

// Dummy data
const stats = [
    {
        id: 1,
        title: "Total Products",
        value: "1,245",
        icon: <ShoppingCart />,
        color: "#4CAF50",
    },
    {
        id: 2,
        title: "Total Users",
        value: "568",
        icon: <People />,
        color: "#2196F3",
    },
    {
        id: 3,
        title: "Total Sales",
        value: "$34,567",
        icon: <AttachMoney />,
        color: "#FF9800",
    },
    {
        id: 4,
        title: "Categories",
        value: "24",
        icon: <Category />,
        color: "#9C27B0",
    },
];

const recentProducts = [
    {
        id: 1,
        name: "Used iPhone 12",
        category: "Electronics",
        price: "$450",
        seller: "John Doe",
        status: "available",
    },
    {
        id: 2,
        name: "Leather Sofa",
        category: "Furniture",
        price: "$320",
        seller: "Jane Smith",
        status: "available",
    },
    {
        id: 3,
        name: "Bicycle",
        category: "Sports",
        price: "$120",
        seller: "Mike Johnson",
        status: "sold",
    },
    {
        id: 4,
        name: "Designer Handbag",
        category: "Fashion",
        price: "$180",
        seller: "Sarah Williams",
        status: "available",
    },
    {
        id: 5,
        name: "Camera Lens",
        category: "Photography",
        price: "$210",
        seller: "David Brown",
        status: "sold",
    },
];

const recentUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
        rating: 4.8,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        rating: 4.9,
    },
    {
        id: 3,
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        status: "active",
        rating: 5.0,
    },
    {
        id: 4,
        name: "Manager",
        email: "manager@example.com",
        role: "manager",
        status: "inactive",
        rating: 4.5,
    },
];

const reports = [
    {
        id: 1,
        product: "Used iPhone 12",
        reporter: "User123",
        reason: "Fake product",
        date: "2023-05-15",
    },
    {
        id: 2,
        product: "Leather Sofa",
        reporter: "User456",
        reason: "Wrong description",
        date: "2023-05-14",
    },
    {
        id: 3,
        product: "Bicycle",
        reporter: "User789",
        reason: "Already sold",
        date: "2023-05-13",
    },
];

const reviews = [
    {
        id: 1,
        product: "Used iPhone 12",
        reviewer: "User123",
        rating: 4,
        comment: "Good condition",
        date: "2023-05-10",
    },
    {
        id: 2,
        product: "Leather Sofa",
        reviewer: "User456",
        rating: 5,
        comment: "Excellent!",
        date: "2023-05-09",
    },
    {
        id: 3,
        product: "Bicycle",
        reviewer: "User789",
        rating: 3,
        comment: "As described",
        date: "2023-05-08",
    },
];

const topRatedProducts = [
    {
        id: 1,
        name: "Leather Sofa",
        category: "Furniture",
        rating: 4.9,
        reviews: 42,
        image: "/images/sofa.jpg",
    },
    {
        id: 2,
        name: "Used iPhone 12",
        category: "Electronics",
        rating: 4.8,
        reviews: 38,
        image: "/images/iphone.jpg",
    },
    {
        id: 3,
        name: "Designer Handbag",
        category: "Fashion",
        rating: 4.7,
        reviews: 25,
        image: "/images/handbag.jpg",
    },
    {
        id: 4,
        name: "Camera Lens",
        category: "Photography",
        rating: 4.6,
        reviews: 19,
        image: "/images/lens.jpg",
    },
    {
        id: 5,
        name: "Bicycle",
        category: "Sports",
        rating: 4.5,
        reviews: 31,
        image: "/images/bike.jpg",
    },
];

const topRatedUsers = [
    {
        id: 1,
        name: "Jane Smith",
        email: "jane@example.com",
        rating: 4.9,
        products: 12,
        image: "/avatars/jane.jpg",
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        rating: 4.8,
        products: 8,
        image: "/avatars/john.jpg",
    },
    {
        id: 3,
        name: "Sarah Williams",
        email: "sarah@example.com",
        rating: 4.7,
        products: 15,
        image: "/avatars/sarah.jpg",
    },
    {
        id: 4,
        name: "Mike Johnson",
        email: "mike@example.com",
        rating: 4.6,
        products: 6,
        image: "/avatars/mike.jpg",
    },
    {
        id: 5,
        name: "David Brown",
        email: "david@example.com",
        rating: 4.5,
        products: 10,
        image: "/avatars/david.jpg",
    },
];

// Dashboard component
const Dashboard = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

    // DataGrid columns
    const productColumns = [
        { field: "name", headerName: "Product Name", width: 200 },
        { field: "category", headerName: "Category", width: 150 },
        { field: "price", headerName: "Price", width: 120 },
        { field: "seller", headerName: "Seller", width: 150 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === "available" ? "success" : "error"}
                    size="small"
                />
            ),
        },
    ];

    const userColumns = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "role",
            headerName: "Role",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={
                        params.value === "admin"
                            ? "primary"
                            : params.value === "manager"
                            ? "secondary"
                            : "default"
                    }
                    size="small"
                />
            ),
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === "active" ? "success" : "error"}
                    size="small"
                />
            ),
        },
    ];

    const reportColumns = [
        { field: "product", headerName: "Product", width: 150 },
        { field: "reporter", headerName: "Reporter", width: 150 },
        { field: "reason", headerName: "Reason", width: 200 },
        { field: "date", headerName: "Date", width: 120 },
    ];

    const reviewColumns = [
        { field: "product", headerName: "Product", width: 150 },
        { field: "reviewer", headerName: "Reviewer", width: 150 },
        {
            field: "rating",
            headerName: "Rating",
            width: 120,
            renderCell: (params) => (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Star color="warning" fontSize="small" />
                    <Typography>{params.value}/5</Typography>
                </Stack>
            ),
        },
        { field: "comment", headerName: "Comment", width: 200 },
        { field: "date", headerName: "Date", width: 120 },
    ];

    const topRatedProductColumns = [
        {
            field: "name",
            headerName: "Product",
            width: 200,
            renderCell: (params) => (
                <Stack direction="row" alignItems="center">
                    <Avatar src={params.row.image} sx={{ mr: 2 }} />
                    <Box>
                        <Typography variant="body2">{params.value}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {params.row.category}
                        </Typography>
                    </Box>
                </Stack>
            ),
        },
        {
            field: "rating",
            headerName: "Rating",
            width: 150,
            renderCell: (params) => (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Star color="warning" fontSize="small" />
                    <Typography>{params.value}</Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                    >
                        ({params.row.reviews} reviews)
                    </Typography>
                </Stack>
            ),
        },
    ];

    const topRatedUserColumns = [
        {
            field: "name",
            headerName: "User",
            width: 200,
            renderCell: (params) => (
                <Stack direction="row" alignItems="center">
                    <UserAvatar src={params.row.image} />
                    <Box>
                        <Typography variant="body2">{params.value}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {params.row.email}
                        </Typography>
                    </Box>
                </Stack>
            ),
        },
        {
            field: "rating",
            headerName: "Rating",
            width: 150,
            renderCell: (params) => (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Star color="warning" fontSize="small" />
                    <Typography>{params.value}</Typography>
                </Stack>
            ),
        },
        {
            field: "products",
            headerName: "Products",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color="primary"
                    size="small"
                    icon={<ShoppingCart fontSize="small" />}
                />
            ),
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard Overview
            </Typography>

            {/* Responsive Stats Cards */}
            <Grid
                container
                spacing={3}
                sx={{
                    mb: 4,
                    // Adjust spacing for different screen sizes
                    ...(isSmallScreen && { spacing: 2 }),
                    ...(isMediumScreen && { spacing: 2.5 }),
                }}
            >
                {stats.map((stat) => (
                    <Grid
                        item
                        xs={12} // Full width on extra small screens
                        sm={6} // 2 cards per row on small screens
                        md={3} // 4 cards per row on medium and larger screens
                        key={stat.id}
                        sx={{
                            // Adjust minWidth for different screens
                            minWidth: isSmallScreen
                                ? "100%"
                                : isMediumScreen
                                ? "calc(50% - 20px)"
                                : "auto",
                        }}
                    >
                        <StatCard elevation={3}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems={
                                    isSmallScreen ? "center" : "flex-start"
                                }
                                spacing={isSmallScreen ? 2 : 1}
                                sx={{ height: "100%" }}
                            >
                                <Box>
                                    <Typography
                                        variant={
                                            isSmallScreen
                                                ? "body2"
                                                : "subtitle2"
                                        }
                                        color="text.secondary"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                    <Typography
                                        variant={isSmallScreen ? "h5" : "h4"}
                                        sx={{
                                            fontWeight: 600,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                </Box>
                                <IconWrapper
                                    sx={{
                                        backgroundColor: stat.color,
                                        alignSelf: isSmallScreen
                                            ? "flex-end"
                                            : "flex-start",
                                    }}
                                >
                                    {React.cloneElement(stat.icon, {
                                        fontSize: isSmallScreen
                                            ? "medium"
                                            : "large",
                                    })}
                                </IconWrapper>
                            </Stack>
                        </StatCard>
                    </Grid>
                ))}
            </Grid>

            {/* Main Content */}
            <Grid container spacing={3}>
                {/* Recent Products */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h6">
                                Recent Products
                            </Typography>
                            <Chip
                                icon={<ShoppingCart />}
                                label="View All"
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ height: 400 }}>
                            <DataGrid
                                rows={recentProducts}
                                columns={productColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Recent Users */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h6">Recent Users</Typography>
                            <Chip
                                icon={<People />}
                                label="View All"
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ height: 400 }}>
                            <DataGrid
                                rows={recentUsers}
                                columns={userColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Top Rated Products */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h6">
                                Top Rated Products
                            </Typography>
                            <Chip
                                icon={<Star />}
                                label="View All"
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                rows={topRatedProducts}
                                columns={topRatedProductColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Top Rated Users */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h6">
                                Top Rated Users
                            </Typography>
                            <Chip
                                icon={<People />}
                                label="View All"
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                rows={topRatedUsers}
                                columns={topRatedUserColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Reports */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h6">Recent Reports</Typography>
                            <Chip
                                icon={<Report />}
                                label="View All"
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                rows={reports}
                                columns={reportColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Reviews */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h6">Recent Reviews</Typography>
                            <Chip
                                icon={<Star />}
                                label="View All"
                                variant="outlined"
                                clickable
                            />
                        </Stack>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ height: 300 }}>
                            <DataGrid
                                rows={reviews}
                                columns={reviewColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
