"use client"

import { useProjectCreation } from '@/hooks/use-project'
import { useAppSelector } from '@/redux/store';
import { formatDistanceToNow } from 'date-fns';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProjectList = () => {
    const { projects, canCreate } = useProjectCreation();
    console.log(projects)
    const user = useAppSelector((state) => state.profile);
    return (
        <div className='space-y-8'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className='text-3xl font-semibold text-foreground'>
                        Your Projects
                    </h1>
                    <p className='text-muted-foreground mt-2'>
                        Manager your design projects and continue where you left off.
                    </p>
                </div>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                        <Plus className='w-8 h-8 text-muted-foreground' />
                    </div>
                    <h3 className='text-lg font-medium text-foreground mb-2'>
                        No projects yet
                    </h3>
                    <p className='text-sm text-muted-foreground mb-6'>
                        Create your first project to get started
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {projects.map((project: any) => (
                        <Link key={project._id} href={`/dashboard/${user.name}/canvas?project=${project._id}`
                        } className="group cursor-pointer" >
                            <div className="space-y-3">
                                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                                    {project.thumbnail ? (
                                        <Image src={project.thumbnail} alt={project.name} width={300} height={200}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-all duration-200'
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                                            <Plus className='w-8 h-8 text-muted-foreground' />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h3 className='font-medium text-foreground truncate text-sm group-hover:text-primary transition-colors'>
                                        {project.name}
                                    </h3>
                                    <p className='text-xs text-muted-foreground'>
                                        {formatDistanceToNow(new Date(project.lastModified), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )
            }
        </div >
    )
}

export default ProjectList