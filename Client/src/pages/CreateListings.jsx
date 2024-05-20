export default function CreateListings() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-4">
        
        <div className="flex flex-col gap-4 flex-1">
          
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />

          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>parking</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>bedrooms</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>bathrooms</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>regularPrice</p>
              <span className="text-xs">( $ / month)</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
              />
              <p>discountedPrice</p>
              <span className="text-xs">( $ / month)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
            <button className='p-3 text-green-500 border border-green-500 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>

      </form>

    </main>
  );
}
