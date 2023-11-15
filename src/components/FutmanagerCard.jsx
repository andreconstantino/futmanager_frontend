import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material"

function FutmanagerCard({ image, alt, title, onClick}) {
  return (
    <>
      <Card className='bg-gray-300 w-5/6 p-5 ml-10 mb-5'>
        <CardActionArea onClick={onClick}>
          <CardMedia
            style={{height: '250px', width: '500px', transition: 'transform 0.3s'}}
            component="img"
            image={image}
            alt={alt}
          />
          <CardContent>
            <h3 className="text-2xl font-bold">
              {title}
            </h3>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default FutmanagerCard