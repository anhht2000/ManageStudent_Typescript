import { Box, Grid, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Loading } from "component/Common/Loading";
import React, { ReactElement, useEffect } from "react";
import { StatisticsItem } from "./components/StatisticsItem";
import {
  actionFetchData,
  getHighestStudent,
  getLoading,
  getLowestStudent,
  getRankingByCityList,
  getStatistics,
} from "./dashboardSlice";
import PregnantWomanIcon from "@material-ui/icons/PregnantWoman";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import StudentTable from "./components/StudentTable";
import BoxRanking from "./components/BoxRanking";
import { getNameCity } from "utils";
import { actionFetchDataCity, getListCity } from "features/city/citySlice";

interface DashBoardProps {}

export default function DashBoard({}: DashBoardProps): ReactElement {
  const dispatch = useAppDispatch();
  const { maleCount, femaleCount, hightMarkCount, lowMarkCount } = useAppSelector(getStatistics);
  const isLoading = useAppSelector(getLoading);
  const ListHighestStudent = useAppSelector(getHighestStudent);
  const ListLowestStudent = useAppSelector(getLowestStudent);
  const ListCityId = useAppSelector(getRankingByCityList);
  const ListCity = useAppSelector(getListCity);

  //
  useEffect(() => {
    dispatch(actionFetchData());
    dispatch(actionFetchDataCity()); //lay du lieu thanh pho
  }, [dispatch]);
  return (
    <>
      {isLoading && <Loading />}
      {/* statistics  */}
      <Box overflow='hidden'>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticsItem
              value={maleCount}
              label='Male Count'
              icon={<PregnantWomanIcon fontSize='large' />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticsItem
              value={femaleCount}
              label='Female Count'
              icon={<AccessibilityIcon fontSize='large' />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticsItem
              value={hightMarkCount}
              label='Mark Up'
              icon={<ThumbUpAltIcon fontSize='large' />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticsItem
              value={lowMarkCount}
              label=' Mark Down'
              icon={<ThumbDownIcon fontSize='large' />}
            />
          </Grid>
        </Grid>
      </Box>
      {/* heghest mark */}
      <Box mt={3} overflow='hidden'>
        <Typography variant='h5'>Top 5 Ranking</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <BoxRanking title={"Top 5 Highest"}>
              <StudentTable studentList={ListHighestStudent} />
            </BoxRanking>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <BoxRanking title={"Top 5 Lowest"}>
              {" "}
              <StudentTable studentList={ListLowestStudent} />
            </BoxRanking>
          </Grid>
        </Grid>
      </Box>
      {/* highest in city */}
      <Box mt={3} overflow='hidden'>
        <Typography variant='h5'>Top 5 Student in City</Typography>
        <Grid container spacing={2}>
          {ListCityId.map((city) => {
            return (
              <Grid item xs={12} md={6} lg={6} key={city.cityId}>
                <BoxRanking title={getNameCity(city.cityId, ListCity)}>
                  {" "}
                  <StudentTable studentList={city.ListStudent} />
                </BoxRanking>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
