import Moodboard from '@/components/styles/mood-board'
import { ThemeContent } from '@/components/styles/theme'
import StyleGuideTypography from '@/components/styles/typography'
import { TabsContent } from '@/components/ui/tabs'
import { MoodBoardImageQuery, StyleGuideQuery } from '@/convex/query.config'
import { MoodBoardImage } from '@/hooks/use-style'
import { StyleGuide } from '@/redux/api/style-guide'
import { Palette } from 'lucide-react'
import React from 'react'

type Props = {
    searchParams: Promise<{
        project: string
    }>
}

const StyleGuidePage = async ({ searchParams }: Props) => {
    const projectId = (await searchParams).project
    const existingStyleGuide = await StyleGuideQuery(projectId);

    const guide = existingStyleGuide.styleGuide?._valueJSON as unknown as StyleGuide

    const colorGuide = guide?.colorSection || []
    const typographyGuide = guide?.typographySection || []

    const existingMoodboardImage = await MoodBoardImageQuery(projectId)
    const guideImages = existingMoodboardImage.images?._valueJSON as unknown as MoodBoardImage[]
    return (
        <div>
            <TabsContent value='colors' className='space-y-8'>
                {!guideImages.length ? (
                    <div className="space-y-8">
                        <div className="text-center py-20">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                                <Palette className='h-8 w-8 text-muted-foreground' />
                            </div>
                            <h3 className='text-lg font-medium text-muted-foreground mb-2'>
                                No colors generated yet
                            </h3>
                            <p className='text-sm text-muted-foreground maw-w-md mx-auto mb-6'>
                                Upload images to your moodboard and generate an AI-powered style guide with colors and typography.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ThemeContent colorGuide={colorGuide} />
                )}
            </TabsContent>

            <TabsContent value='typography'>
                <StyleGuideTypography typographyGuide={typographyGuide} />
            </TabsContent>

            <TabsContent value='moodboard'>
                <Moodboard guideImages={guideImages} />
            </TabsContent>
        </div>
    )
}

export default StyleGuidePage