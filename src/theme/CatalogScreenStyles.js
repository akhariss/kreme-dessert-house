import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const catalogScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        paddingTop: theme.spacing.xxl + 10,
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
        ...theme.shadows.medium,
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: theme.colors.black,
    },
    headerSubtitle: {
        color: theme.colors.black,
        marginTop: theme.spacing.xs,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        margin: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.xl,
        ...theme.shadows.small,
    },
    searchIcon: {
        marginRight: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.black,
    },
    productList: {
        padding: theme.spacing.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: theme.spacing.xxl,
    },
    emptyText: {
        color: theme.colors.gray,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
    },
});
