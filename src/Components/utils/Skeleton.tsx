import { Grid, Card, Skeleton } from '@mui/material';
const SkeletonLoader = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {Array.from(new Array(6)).map((_, index) => (
        <Grid item xs={4} sm={4} md={4} key={index}>
          <Card>
            <Skeleton variant="rectangular" sx={{height:{xs:90,sm:100,md:120}}} />
            <Skeleton variant="text" width="60%" style={{ margin: '16px auto' }} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;
