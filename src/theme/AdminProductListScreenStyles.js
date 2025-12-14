import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const adminProductListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
    },
    header: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
    },
    list: {
        padding: theme.spacing.md,
        paddingBottom: 100, // Space for FAB
    },
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.sm,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
        ...theme.shadows.small,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: '#f0f0f0'
    },
    info: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    name: {
        fontSize: theme.fontSizes.md,
        fontWeight: 'bold',
    },
    price: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray,
    },
    actions: {
        flexDirection: 'row',
    },
    actionBtn: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: theme.colors.secondary,
        marginLeft: 8,
    },
    deleteBtn: {
        backgroundColor: theme.colors.warning
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.medium,
        elevation: 6
    }
});
