

const Nodata = () => {
    return (
        <>
            <div className=" w-full px-10 md:px-0 h-screen flex items-center justify-center">
                <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                    <img src='https://static.vecteezy.com/system/resources/previews/012/181/008/original/document-data-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg' className='h-16'></img>
                    
                    <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, No data found.</p>
                </div>
            </div></>
    )
}

export default Nodata