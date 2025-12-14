import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const loginScreenStyles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    title: {
        fontSize: theme.fontSizes.xxxl,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray,
        letterSpacing: 2,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.lightGray,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.xs,
        marginBottom: theme.spacing.xl,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
        borderRadius: theme.borderRadius.sm,
    },
    toggleButtonActive: {
        backgroundColor: theme.colors.white,
        ...theme.shadows.small,
    },
    toggleText: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray,
        fontWeight: '500',
    },
    toggleTextActive: {
        color: theme.colors.primary,
        fontWeight: 'bold',
    },
    form: {
        marginBottom: theme.spacing.lg,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        ...theme.shadows.small,
    },
    inputIcon: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.black,
    },
    eyeIcon: {
        padding: theme.spacing.sm,
    },
    submitButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginTop: theme.spacing.md,
        ...theme.shadows.medium,
    },
    submitText: {
        color: theme.colors.white,
        fontSize: theme.fontSizes.lg,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.lightGray,
    },
    dividerText: {
        marginHorizontal: theme.spacing.md,
        color: theme.colors.gray,
        fontSize: theme.fontSizes.sm,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: theme.colors.lightGray,
        ...theme.shadows.small,
    },
    googleText: {
        marginLeft: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        color: theme.colors.black,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    modalContent: {
        width: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xl,
        ...theme.shadows.large,
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    modalTitle: {
        fontSize: theme.fontSizes.xl,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    modalSubtitle: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray,
        textAlign: 'center',
    },
    modalBody: {
        width: '100%',
    },
    codeInput: {
        backgroundColor: theme.colors.lightGray,
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.xl,
        textAlign: 'center',
        letterSpacing: 4,
        marginBottom: theme.spacing.lg,
    },
    verifyButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    cancelButton: {
        alignItems: 'center',
        padding: theme.spacing.sm,
    },
    cancelText: {
        color: theme.colors.gray,
        fontSize: theme.fontSizes.md,
    },
});
