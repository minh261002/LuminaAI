import { Type } from 'lucide-react'
import React from 'react'

type Props = {
    typographyGuide: any
}

const StyleGuideTypography = (
    { typographyGuide }: Props
) => {
    return (
        <>
            {typographyGuide.length === 0 ? (
                <div className='text-center py-20'>
                    <div className='w-16 h-16 mx-auto mb-4 text-muted-foreground'>
                        <Type className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <h3 className='text-lg font-medium text-muted-foreground mb-2'>
                        No typography generated yet
                    </h3>
                    <p className='text-sm text-muted-foreground mb-6'>
                        Generate a style guide to see typography recommendations
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-10">
                    {typographyGuide.map((section: any, index: number) => {
                        <div className='flex flex-col gap-5' key={index}>
                            <div>
                                <h3 className='text-lg font-medium text-foreground/50'>
                                    {section.title}
                                </h3>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {section.styles?.map((style: any, styleIndex: number) => {
                                    <div
                                        key={styleIndex}
                                        className='p-6 rounded-2xl backdrop-blur-xl bg-white/[0.2] border border-white/[0.08] saturate-150'
                                    >
                                        <div className="space-y-4">
                                            <h4 className='text-sm font-medium text-foreground/50'>
                                                {style.name}
                                            </h4>
                                            {style.description && (
                                                <p className='text-sm text-muted-foreground'>
                                                    {style.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className='text-foreground'
                                            style={{
                                                fontFamily: style.fontFamily,
                                                fontSize: style.fontSize,
                                                fontWeight: style.fontWeight,
                                                lineHeight: style.lineHeight,
                                                letterSpacing: style.letterSpacing || 'normal',
                                            }}
                                        >
                                            The quick brown fox jumps   over the lazy dog
                                        </div>

                                        <div className='text-xs text-muted-foreground space-y-1'>
                                            <div>Font Family: {style.fontFamily}</div>
                                            <div>Font Size: {style.fontSize}px</div>
                                            <div>Font Weight: {style.fontWeight}</div>
                                            <div>Line Height: {style.lineHeight}</div>
                                            {style.letterSpacing && (
                                                <div>Letter Spacing: {style.letterSpacing}px</div>
                                            )}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            )}
        </>
    )
}

export default StyleGuideTypography