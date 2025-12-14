import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const cartScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        paddingTop: theme.spacing.md,
        backgroundColor: theme.colors.white,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
        ...theme.shadows.medium,
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    cartIcon: {
        position: 'relative',
        padding: theme.spacing.sm,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    listContent: {
        padding: theme.spacing.md,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.medium,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.secondary,
    },
    itemDetails: {
        flex: 1,
        marginLeft: theme.spacing.md,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
        color: theme.colors.black,
        textAlign: 'left',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.colors.black,
    },
    quantityButton: {
        width: 20,
        height: 20,
        borderRadius: 16,
        backgroundColor: theme.colors.darkPink,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    removeButton: {
        padding: theme.spacing.sm,
    },
    footer: {
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.white,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        ...theme.shadows.large,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightGray,
    },
    checkoutButton: {
        width: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    browseButton: {
        minWidth: 200,
    },
});
