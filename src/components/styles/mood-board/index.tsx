"use client"

import { MoodBoardImage, useMoodBoard } from '@/hooks/use-style'
import { cn } from '@/lib/utils'
import React, { useRef } from 'react'
import ImageBoard from './images.board'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

type Props = {
    guideImages: MoodBoardImage[]
}

const Moodboard = ({ guideImages }: Props) => {
    const {
        images,
        dragActive,
        removeImage,
        handleDrag,
        handleDrop,
        handleFileInput,
        canAddMore
    } = useMoodBoard(guideImages)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className={cn(
                'relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-200 min-h-[400px] flex items-center justify-center',
                dragActive
                    ? 'border-primary bg-primary/5 scale-[1.02]'
                    : 'border-border/50 hover:border-border'
            )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
                </div>

                {images.length > 0 && (
                    <>
                        <div className='lg:hidden absolute inset-0 flex items-center justify-center'>
                            <div className="relative">
                                {images.map((image, index) => {
                                    const seed = image.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

                                    const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
                                    const random2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280;
                                    const random3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;

                                    const rotation = (random1 - 0.5) * 20
                                    const xOffset = (random2 - 0.5) * 40
                                    const yOffset = (random3 - 0.5) * 30

                                    return (
                                        <ImageBoard
                                            key={`mobile-${image.id}`}
                                            image={image}
                                            removeImage={removeImage}
                                            xOffset={xOffset}
                                            yOffset={yOffset}
                                            rotation={rotation}
                                            zIndex={index + 1}
                                            marginLeft="-80px"
                                            marginRight="-96px"
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        <div className='hidden lg:flex absolute inset-0 items-center justify-center'>
                            <div className="relative w-full h-full max-w-[700px] max-h-[300px] mx-auto">
                                {images.map((image, index) => {
                                    const seed = image.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

                                    const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
                                    const random2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280;
                                    const random3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;

                                    const rotation = (random1 - 0.5) * 20
                                    const xOffset = (random2 - 0.5) * 40
                                    const yOffset = (random3 - 0.5) * 30

                                    return (
                                        <ImageBoard
                                            key={`mobile-${image.id}`}
                                            image={image}
                                            removeImage={removeImage}
                                            xOffset={xOffset}
                                            yOffset={yOffset}
                                            rotation={rotation}
                                            zIndex={index + 1}
                                            marginLeft="-80px"
                                            marginRight="-96px"
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}

                {images.length > 0 && canAddMore && (
                    <div className='absolute bottom-6 right-6 z-20'>
                        <Button
                            onClick={handleUploadClick}
                            size={"sm"}
                            variant={"outline"}
                        >
                            <Upload className='h-4 w-4 mr-2' />
                            Add More
                        </Button>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleFileInput}
                    className='hidden'
                    disabled={!canAddMore}
                />
            </div>

            <Button className='w-fit'>Generate With Ai</Button>

            {images.length >= 5 && (
                <div className='text-center p-4 bg-muted/50 rounded-2xl'>
                    <p className='text-sm text-muted-foreground'>
                        Maximun of 5 images reached. Remove an image to add more.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Moodboard