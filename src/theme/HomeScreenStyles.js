import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const screenHeight = Dimensions.get('window').height;

export const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
    },
    scrollContent: {
        flexGrow: 1,
    },
    heroSection: {
        // Full screen height implementation
        height: screenHeight,
        width: '100%',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
    },

    // *** OVERRIDE STYLES for ThemeText components ***
    brandNameOverride: {
        fontFamily: 'PlayfairDisplay-Bold',
        letterSpacing: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 6,
    },
    brandSubtitleOverride: {
        fontFamily: 'PlayfairDisplay-Regular',
        letterSpacing: 6,
        marginBottom: theme.spacing.lg * 2,
    },

    // *** TAGLINE - Subtle Serif Style ***
    tagline: {
        fontSize: theme.fontSizes.lg + 2,
        fontFamily: 'PlayfairDisplay-Italic',
        color: theme.colors.white,
        marginBottom: theme.spacing.xl,
        fontWeight: 'normal',
        letterSpacing: 1,
    },

    // *** DESCRIPTION - Clean and Readable Sans-serif Style ***
    description: {
        fontSize: theme.fontSizes.md,
        fontFamily: 'PlayfairDisplay-Regular',
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: theme.spacing.xxl,
        lineHeight: 28, // Increased line height for elegant readability
        paddingHorizontal: theme.spacing.lg,
    },

    exploreButton: {
        minWidth: 250,
    },
    // ... (Other feature styles are kept but not displayed for brevity)
    featuresSection: {
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.secondary,
    },
    sectionTitle: {
        fontSize: theme.fontSizes.xxl,
        fontWeight: 'bold',
        color: theme.colors.black,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    featuresGrid: {
        gap: theme.spacing.md,
    },
    featureCard: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    featureIcon: {
        fontSize: 48,
        marginBottom: theme.spacing.md,
    },
    featureTitle: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 'bold',
        color: theme.colors.black,
        marginBottom: theme.spacing.sm,
    },
    featureText: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray,
        textAlign: 'center',
        lineHeight: 20,
    },
});
