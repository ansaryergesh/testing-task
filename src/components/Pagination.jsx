import { Box, Pagination, Stack } from "@mui/material"
import React from "react"
export const Paginator = (props) => {
    return (
        <Box>
            <Stack spacing={2} gutterBottom marginTop={2} marginBottom={2} alignItems={"center"}>
                <Pagination count={props.totalPage} page={props.page} shape="rounded" onChange={props.changePage} />
            </Stack>
        </Box>

    )
}