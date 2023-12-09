import { Divider, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

function FutmanagerTitles({ title, back, edit, titleEdit}) {
  return (
    <>
      <div className='w-full flex'>
        {back && (
          <IconButton className="ml-5 text-red-400" edge="start" color="inherit" onClick={back}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <h3 className="text-2xl p-4 text-blue-fut-paz-900 m-3 font-bold">{title}</h3>
        {edit && (
        <div className='flex ml-auto pr-10'>
          <IconButton className="ml-5 text-red-400" edge="start" color="inherit" onClick={edit}>
          <p className="text-xl pr-3">{titleEdit}</p> <EditIcon />
          </IconButton>
        </div>
        )}
      </div>
      
      <Divider className='w-full mb-5' />
    </>
  )
}
export default FutmanagerTitles