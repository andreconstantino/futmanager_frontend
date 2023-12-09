import ImagemFundo from "./ImagemFundo";
import ImagemPrincipal from "./ImagemPrincipal";


export function HomeBanner(){
    return (
        <>
        <div>
            <div className="flex">
                <ImagemFundo/>
                <ImagemPrincipal/>
            </div>
        </div>
        </>
    )
}