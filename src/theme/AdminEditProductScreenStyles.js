import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const adminEditProductScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.white,
        ...theme.shadows.small,
        paddingTop: 50 // Status Bar fix
    },
    backBtn: {
        padding: 8
    },
    headerSpacer: {
        width: 40,
    },
    scrollContent: {
        padding: theme.spacing.lg,
        paddingBottom: 100
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 24
    },
    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#eee'
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addPhotoText: {
        fontSize: 12,
        color: theme.colors.gray,
        marginTop: 4
    },
    changePhotoText: {
        fontSize: 12,
        color: theme.colors.primary,
        marginTop: 8
    },
    sectionHeader: {
        fontSize: 18,
        color: theme.colors.primary,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightGray,
        paddingBottom: 8
    },
    sectionHeaderMargin: {
        marginTop: 24,
    },
    inputGroup: {
        marginBottom: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 14,
        color: theme.colors.gray,
        marginBottom: 6,
        fontWeight: '600'
    },
    input: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: theme.colors.black,
        borderWidth: 1,
        borderColor: '#eee'
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top'
    },
    footer: {
        marginTop: 32,
        marginBottom: 32
    },
    flex1: {
        flex: 1
    },
    marginRight8: {
        marginRight: 8
    },
    marginLeft8: {
        marginLeft: 8
    }
});
