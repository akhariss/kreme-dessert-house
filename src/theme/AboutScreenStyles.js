import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const aboutScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: theme.spacing.xxl,
    },
    imageSection: {
        marginBottom: theme.spacing.xxl,
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        ...theme.shadows.medium,
    },
    interiorImage: {
        width: '100%',
        height: 250,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    storySection: {
        marginBottom: theme.spacing.xxl,
        alignItems: 'center',
    },
    valuesSection: {
        marginBottom: theme.spacing.xxl,
        alignItems: 'center',
    },
    valuesList: {
        width: '100%',
    },
    valueItem: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        paddingHorizontal: theme.spacing.xl,
    },
    contactSection: {
        alignItems: 'center',
    },
    contactInfo: {
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
    },
});
