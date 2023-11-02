import ImagemCategoria from "./ImagemCategoria";
import ImagemPrincipal from "./ImagemPrincipal";


export function HomeBanner(){
    return (
        <>
        <div>
            <div className="flex">
                <ImagemCategoria/>
                <ImagemPrincipal/>
            </div>
        </div>
        </>
    )
}