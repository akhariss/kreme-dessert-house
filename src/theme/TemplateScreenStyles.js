import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const templateScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    title: {
        color: theme.colors.primary,
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    subtitle: {
        color: theme.colors.gray,
        textAlign: 'center',
    },
});
