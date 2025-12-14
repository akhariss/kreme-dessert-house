import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width, height } = Dimensions.get('window');

export const dashboardScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: theme.spacing.xs,
    },

    heroContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    heroImageWrapper: {
        paddingTop: theme.spacing.xl,
    },
    heroImage: {
        width: width,
        height: height * 0.55,
        resizeMode: 'cover',
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroTextContainer: {
        alignItems: 'center',
    },

    buttonContainer: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.md,
    },
    shopButton: {
        minWidth: '100%',
    },
    carouselContainer: {
        marginTop: theme.spacing.xl,
    },
    sectionTitleOverride: {
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },
    carousel: {
        paddingHorizontal: theme.spacing.xs, // "Space pojoknya di besarin"
        paddingBottom: theme.spacing.lg,
    },
    productCardWrapper: {
        width: 200, // "Ukurannya besarin dikit" (was 180)
        marginRight: theme.spacing.xs, // "Space anter produk kecilin" (was md)
    },
});
