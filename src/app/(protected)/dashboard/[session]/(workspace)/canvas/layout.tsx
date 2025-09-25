import Toolbar from '@/components/canvas/toolbar'
import React from 'react'

const CanvasLayout = (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
    return (
        <div className='w-full h-screen'>
            {children}
            <Toolbar />
        </div>
    )
}

export default CanvasLayout