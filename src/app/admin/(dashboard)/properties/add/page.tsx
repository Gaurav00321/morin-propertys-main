'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  Info, 
  TrendingUp, 
  Home, 
  Plus,
  Tag,
  ChevronRight,
  Trash2,
  Video,
  Image as ImageIcon
} from 'lucide-react'

export default function AddPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form Fields
  const [code, setCode] = useState(`PRP${Math.floor(Math.random() * 10000)}`)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Flat / Apartment')
  const [location, setLocation] = useState('')
  const [locality, setLocality] = useState('')
  const [price, setPrice] = useState('')
  const [priceLabel, setPriceLabel] = useState('')
  const [bhk, setBhk] = useState('')
  const [bedrooms, setBedrooms] = useState('1')
  const [bathrooms, setBathrooms] = useState('1')
  const [area, setArea] = useState('')
  const [areaUnit, setAreaUnit] = useState('sq.ft.')
  const [description, setDescription] = useState('')
  const [badge, setBadge] = useState('For Sale')

  // Storage files
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [videoFiles, setVideoFiles] = useState<File[]>([])

  // Previews
  const coverPreview = coverFile ? URL.createObjectURL(coverFile) : null
  const galleryPreviews = galleryFiles.map(file => URL.createObjectURL(file))
  const videoPreviews = videoFiles.map(file => URL.createObjectURL(file))

  const handleAddGalleryFiles = (files: FileList | null) => {
    if (!files) return
    setGalleryFiles(prev => [...prev, ...Array.from(files)])
  }

  const handleAddVideoFiles = (files: FileList | null) => {
    if (!files) return
    setVideoFiles(prev => [...prev, ...Array.from(files)])
  }

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideoFile = (index: number) => {
    setVideoFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUploadFiles = async (): Promise<string[]> => {
    const uploadTasks: Promise<string | null>[] = []

    if (coverFile) {
      const coverExt = coverFile.name.split('.').pop()
      const coverName = `${Date.now()}-cover.${coverExt}`
      uploadTasks.push(
        supabase.storage.from('properties').upload(coverName, coverFile)
          .then(({ data, error }) => {
            if (error) throw error
            const { data: pubData } = supabase.storage.from('properties').getPublicUrl(coverName)
            return pubData.publicUrl
          })
      )
    }

    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach((file, index) => {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-gallery-${index}-${Math.random().toString(36).substring(7)}.${ext}`
        uploadTasks.push(
          supabase.storage.from('properties').upload(fileName, file)
            .then(({ data, error }) => {
              if (error) throw error
              const { data: pubData } = supabase.storage.from('properties').getPublicUrl(fileName)
              return pubData.publicUrl
            })
        )
      })
    }

    const urls = await Promise.all(uploadTasks)
    return urls.filter((url): url is string => url !== null)
  }

  const handleUploadVideos = async (): Promise<string[]> => {
    if (!videoFiles || videoFiles.length === 0) return []

    const uploadTasks: Promise<string | null>[] = videoFiles.map((file, index) => {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-video-${index}-${Math.random().toString(36).substring(7)}.${ext}`
      return supabase.storage.from('properties').upload(fileName, file)
        .then(({ data, error }) => {
          if (error) throw error
          const { data: pubData } = supabase.storage.from('properties').getPublicUrl(fileName)
          return pubData.publicUrl
        })
    })

    const urls = await Promise.all(uploadTasks)
    return urls.filter((url): url is string => url !== null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(3,7)
      
      const imageUrls = await handleUploadFiles()
      const videoUrls = await handleUploadVideos()

      const { error: dbError } = await supabase.from('properties').insert([{
        slug,
        code,
        title,
        type,
        location,
        locality,
        price: Number(price),
        price_label: priceLabel,
        bhk,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        area_unit: areaUnit,
        description,
        badge,
        images: imageUrls,
        videos: videoUrls,
        featured: true // Just defaulting to true for now
      }])

      if (dbError) throw new Error(dbError.message)
      
      router.push('/admin/properties')
    } catch (err: any) {
      setError(err.message || 'Error adding property')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <h1 className="text-3xl font-serif font-bold text-teal-950 mb-8">Add New Property</h1>
      
      {error && <div className="bg-red-50 text-red-600 p-4 mb-6 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Basic Information Section */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
              <Info size={24} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-teal-950">Property Identity</h3>
              <p className="text-gray-500 text-xs md:text-sm">Foundational listing identifiers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-2">
              <label className="flex items-center gap-2 text-[10px] font-bold text-teal-900 mb-2 uppercase tracking-[0.2em] ml-1">
                Property Title <span className="text-brand-accent">*</span>
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-600 transition-colors">
                  <Tag size={18} />
                </div>
                <input 
                  required 
                  type="text" 
                  value={title} 
                  onChange={(e)=>setTitle(e.target.value)} 
                  className="w-full text-lg pl-14 pr-6 py-4 bg-gray-50/50 border-2 border-transparent focus:border-teal-500/20 focus:bg-white rounded-2xl focus:ring-0 transition-all placeholder:text-gray-300 shadow-inner"
                  placeholder="e.g. Skyline Luxury Penthouse"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Archive Code</label>
              <input 
                required 
                type="text" 
                value={code} 
                onChange={(e)=>setCode(e.target.value)} 
                className="w-full px-6 py-4 bg-gray-50/30 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-mono text-teal-700 text-sm tracking-tighter" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Inventory Type</label>
              <div className="relative">
                <select 
                  required 
                  value={type} 
                  onChange={(e)=>setType(e.target.value)} 
                  className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 appearance-none text-teal-900 font-semibold"
                >
                  <option value="Flat / Apartment">Flat / Apartment</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-teal-600">
                  <ChevronRight size={18} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">City / Town</label>
              <input required type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 text-sm font-medium" placeholder="e.g. Vadodara" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Neighborhood / Locality</label>
              <input required type="text" value={locality} onChange={(e)=>setLocality(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 text-sm font-medium" placeholder="e.g. Gotri" />
            </div>
          </div>
        </div>

        {/* Pricing & Specs */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-8 duration-500 delay-100">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-teal-950">Valuation & Metrics</h3>
              <p className="text-gray-500 text-xs md:text-sm">Commercial and spatial metrics.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Hard Price (₹)</label>
              <input 
                required 
                type="number" 
                inputMode="numeric"
                value={price} 
                onChange={(e)=>setPrice(e.target.value)} 
                className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-mono font-bold text-teal-900" 
                placeholder="7500000" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Marketing Label</label>
              <input required type="text" value={priceLabel} onChange={(e)=>setPriceLabel(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-semibold" placeholder="e.g. ₹75 Lac" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Configuration (BHK)</label>
              <input required type="text" value={bhk} onChange={(e)=>setBhk(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500" placeholder="e.g. 3.5 BHK"/>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Floor Area</label>
              <div className="flex bg-gray-50/50 rounded-2xl focus-within:ring-2 focus-within:ring-teal-500 transition-all overflow-hidden">
                <input 
                  required 
                  type="number" 
                  inputMode="numeric"
                  value={area} 
                  onChange={(e)=>setArea(e.target.value)} 
                  className="flex-1 bg-transparent px-6 py-4 border-none focus:ring-0 text-base font-bold" 
                  placeholder="1850" 
                />
                <input type="text" value={areaUnit} onChange={(e)=>setAreaUnit(e.target.value)} className="w-24 bg-teal-950 text-white text-center text-[10px] uppercase font-black tracking-widest" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Bedrooms</label>
                <input required type="number" inputMode="numeric" value={bedrooms} onChange={(e)=>setBedrooms(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Bathrooms</label>
                <input required type="number" inputMode="numeric" value={bathrooms} onChange={(e)=>setBathrooms(e.target.value)} className="w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* Media Assets Section */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-8 duration-500 delay-200">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
              <ImageIcon size={24} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-teal-950">Visual Assets</h3>
              <p className="text-gray-500 text-xs md:text-sm">Motion and stills for the showcase.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Main Cover */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Main Spotlight Image</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative aspect-[4/3] rounded-3xl border-2 border-dashed border-teal-100 hover:border-teal-400 bg-gray-50/30 overflow-hidden transition-all group">
                  {coverPreview ? (
                    <>
                      <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                      <button onClick={() => setCoverFile(null)} className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-xl text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all active:scale-95">
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <input required type="file" accept="image/*" onChange={(e)=>setCoverFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="w-10 h-10 bg-teal-900 text-white rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                        <Plus size={20} />
                      </div>
                      <p className="text-[10px] font-bold text-teal-900 uppercase tracking-widest">Select Cover</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1">Ensemble Gallery</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryPreviews.map((src, index) => (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeGalleryFile(index)} className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-md rounded-lg text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-all active:scale-95">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <div className="relative aspect-square rounded-2xl border-2 border-dashed border-teal-100 hover:border-teal-400 bg-gray-50/30 flex flex-col items-center justify-center p-4 text-center transition-all group">
                  <input type="file" accept="image/*" multiple onChange={(e)=>handleAddGalleryFiles(e.target.files)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="w-8 h-8 bg-teal-100 text-teal-900 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Plus size={18} />
                  </div>
                  <p className="text-[10px] font-bold text-teal-900 uppercase tracking-[0.1em]">Add More</p>
                </div>
              </div>
            </div>

            {/* Videos */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-teal-900 block uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                <Video size={14} className="text-teal-600" /> Cinematic Stills
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videoFiles.map((file, index) => (
                  <div key={index} className="relative aspect-video rounded-2xl overflow-hidden bg-teal-950 border border-teal-900 group">
                    <video className="w-full h-full object-cover opacity-60">
                      <source src={URL.createObjectURL(file)} />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-[10px] text-white/50 truncate px-4">{file.name}</p>
                    </div>
                    <button onClick={() => removeVideoFile(index)} className="absolute top-3 right-3 p-2 bg-white/10 backdrop-blur-md rounded-xl text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all active:scale-95 border border-white/20">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <div className="relative aspect-video rounded-2xl border-2 border-dashed border-teal-100 hover:border-teal-400 bg-gray-50/30 flex flex-col items-center justify-center p-6 text-center transition-all group">
                  <input type="file" accept="video/*" multiple onChange={(e)=>handleAddVideoFiles(e.target.files)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Plus size={20} />
                  </div>
                  <p className="text-[10px] font-bold text-teal-900 uppercase tracking-widest">Select Videos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm animate-in slide-in-from-bottom-8 duration-500 delay-300">
          <label className="text-xl md:text-2xl font-serif font-bold text-teal-950 mb-6 flex items-center gap-3">
             The Property Narrative
          </label>
          <textarea 
            required 
            rows={6} 
            value={description} 
            onChange={(e)=>setDescription(e.target.value)} 
            className="w-full text-base md:text-lg px-6 md:px-8 py-6 bg-gray-50/50 border-none rounded-[2rem] focus:ring-2 focus:ring-teal-500 transition-all leading-relaxed placeholder:text-gray-300" 
            placeholder="Eloquently describe the property's character, craftsmanship, and local experience..."
          />
        </div>

        <div className="pt-6 sticky bottom-6 z-20 md:relative md:bottom-0">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-teal-950 text-white font-bold py-6 rounded-[2rem] hover:bg-teal-900 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 text-xl"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="animate-pulse">Archiving Property...</span>
              </>
            ) : (
              <>
                <span>Publish Listing</span>
                <ChevronRight size={24} className="text-teal-400" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
