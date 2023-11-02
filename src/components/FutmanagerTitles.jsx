import { Divider, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FutmanagerTitles({ title, back }) {
  return (
    <>
      <div className='w-full flex'>
        {back && (
          <IconButton className="ml-5 text-red-400" edge="start" color="inherit" onClick={back}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <h3 className="text-2xl p-4 text-blue-fut-paz-900 m-3 font-bold">{title}</h3>
      </div>
      <Divider className='w-full mb-5' />
    </>
  )
}

export default FutmanagerTitles