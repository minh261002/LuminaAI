import { api } from "../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { ConvexUserRaw, normalizeProfile } from "@/types/user";
import { Id } from "../../convex/_generated/dataModel";

export const ProfileQuery = async () => {
  return await preloadQuery(
    api.user.getCurrentUser,
    {},
    { token: await convexAuthNextjsToken() }
  );
};

export const SubscriptionEntitlementQuery = async () => {
  const rawProfile = await ProfileQuery();
  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw
  );
  const entitlement = await preloadQuery(
    api.subscription.hasEntitlement,
    { userId: profile?.id as Id<"users"> },
    { token: await convexAuthNextjsToken() }
  );

  return { entitlement, profileName: profile?.name };
};

export const ProjectsQuery = async () => {
  const rawProfile = await ProfileQuery();
  const profile = normalizeProfile(
    rawProfile._valueJSON as unknown as ConvexUserRaw | null
  );

  if (!profile?.id) {
    return { projects: null, profile: null };
  }

  const projects = await preloadQuery(
    api.project.getUserProjects,
    {
      userId: profile.id as Id<"users">,
    },
    { token: await convexAuthNextjsToken() }
  );

  return { projects, profile };
};

export const StyleGuideQuery = async (projectId: string) => {
  const styleGuide = await preloadQuery(
    api.project.getProjectStyleGuide,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );

  return { styleGuide };
};

export const MoodBoardImageQuery = async (projectId: string) => {
  const images = await preloadQuery(
    api.moodboard.getProjectMoodboardImage,
    { projectId: projectId as Id<"projects"> },
    { token: await convexAuthNextjsToken() }
  );

  return { images };
};
